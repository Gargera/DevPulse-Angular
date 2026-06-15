import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../Services/blog.service';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../Core/Models/Category/Category';
import { environment } from '../../../environments/environment.development';
import { IValidationResponse } from '../../Core/Models/Common/IValidationResponse';
import { CommonModule, Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-blog.html',
  styleUrl: './update-blog.css'
})
export class UpdateBlog implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);
  private categoryService = inject(CategoryService);
  private location = inject(Location);

  updateForm!: FormGroup;
  blogId!: number;
  isLoading = true;
  isSubmitting = false;
  errorMessage = '';
  
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  imageError = '';
  currentImageUrl: string | null = null;
  domainUrl = environment.baseUrl;
  categories: Category[] = [];

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.updateForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      Category: ['', Validators.required],
      image: [null]
    });

    this.isLoading = true;

    this.categoryService.getCategories().subscribe({
      next: (catData) => {
        this.categories = catData;
        this.loadBlogData();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  async loadBlogData(): Promise<void> {
    this.blogService.getBlogById(this.blogId).subscribe({
      next: (data) => {
        this.updateForm.patchValue({
          title: data.title,
          content: data.content,
          Category: data.categoryName
        });

        if (data.imageUrl) {
          this.currentImageUrl = data.imageUrl;
          this.imagePreview = this.domainUrl + data.imageUrl;
        }
        this.isLoading = false;
      },
      error: (err) => {
        if(err.status === 404) this.router.navigate(['/not-found']);
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

    if (!allowedTypes.includes(file.type)) {
      this.imageError = 'Only JPG, JPEG, PNG and WEBP are allowed';
      this.clearImageInput();
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      this.imageError = 'Image size must be less than 5 MB';
      this.clearImageInput();
      return;
    }

    this.imageError = '';
    this.selectedFile = file;
    this.updateForm.patchValue({ image: this.selectedFile });

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  clearImageInput(): void {
    this.selectedFile = null;
    this.updateForm.patchValue({ image: null });
    if (this.currentImageUrl) {
      this.imagePreview = this.domainUrl + this.currentImageUrl;
    } else {
      this.imagePreview = null;
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.currentImageUrl = null;
    this.imageError = '';
    this.updateForm.patchValue({ image: null });
  }

  get titleValid(): IValidationResponse {
    let response: IValidationResponse = { Success: false, Message: "" };
    let control = this.updateForm.get('title');
    if (!control?.touched) return response;

    if (control?.errors?.['required'])
      response.Message = "Title is required";
    else if (control?.errors?.['minlength'])
      response.Message = `Title must be at least ${control.errors?.['minlength']?.requiredLength} characters`;
    else if (control?.errors?.['maxlength'])
      response.Message = `Title cannot exceed ${control.errors?.['maxlength']?.requiredLength} characters`;
    else
      response.Success = true;
    return response;
  }

  get contentValid(): IValidationResponse {
    let response: IValidationResponse = { Success: false, Message: "" };
    let control = this.updateForm.get('content');
    if (!control?.touched) return response;

    if (control?.errors?.['required'])
      response.Message = "Content is required";
    else if (control?.errors?.['minlength'])
      response.Message = `Content must be at least ${control.errors?.['minlength']?.requiredLength} characters`;
    else
      response.Success = true;
    return response;
  }

  get categoryValid(): IValidationResponse {
    let response: IValidationResponse = { Success: false, Message: "" };
    let category = this.updateForm.get('Category');
    if (!category?.touched) return response;

    if (category?.errors?.['required'])
      response.Message = 'Please select a category';
    else
      response.Success = true;
    return response;
  }

  onSubmit() {
    this.updateForm.markAllAsTouched();

    if (this.updateForm.valid && !this.imageError) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formData = new FormData();
      formData.append('Title', this.updateForm.value.title);
      formData.append('Content', this.updateForm.value.content);
      formData.append('CategoryName', this.updateForm.value.Category);
      
      if (this.selectedFile) {
        formData.append('Image', this.selectedFile);
      }

      Swal.fire({
      title: 'Edit Article?',
      text: 'You will be redirected to the modification dashboard.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#9333ea',
      cancelButtonColor: '#7c6fa0',
      confirmButtonText: 'Yes, Edit it! ✏️',
      cancelButtonText: 'Stay here'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.updateBlog(this.blogId, formData).subscribe({
          next: () => {
            this.location.back();
          },
          error: (err) => {
            this.errorMessage = err?.error;
            console.log(err);
          }
        });
      }
    });

    this.isSubmitting = false;
    }
  }

  goBack()
  {
    this.location.back();
  }
}