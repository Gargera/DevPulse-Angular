import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogService } from '../../Services/blog.service';
import { environment } from '../../../environments/environment.development';
import { IValidationResponse } from '../../Core/Models/Common/IValidationResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './update-blog.html',
  styleUrl: './update-blog.css'
})
export class UpdateBlog implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);

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

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.updateForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      image: [null]
    });

    this.isLoading = true;

      this.blogService.getBlogById(this.blogId).subscribe({
        next: (data) => {
          this.updateForm.patchValue({
              title: data.title,
              content: data.content
            });

          if (data.imageUrl) {
            this.currentImageUrl = data.imageUrl;
            this.imagePreview = this.domainUrl + data.imageUrl;
          }
        },
        error: (err) => {
          if(err.status === 404) this.router.navigate(['/not-found']);
          console.log(err);
        }
      });
    
      this.isLoading = false;
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      this.imageError = 'Only JPG, PNG and WEBP are allowed';
      this.clearImageInput();
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) 
    {
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
    if (this.currentImageUrl) 
    {
      this.imagePreview = this.domainUrl + this.currentImageUrl;
    } 
    else 
    {
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

  async onSubmit(): Promise<void> {
    this.updateForm.markAllAsTouched();

    if (this.updateForm.valid && !this.imageError) {
      this.isSubmitting = true;
        this.errorMessage = '';

        const formData = new FormData();
        formData.append('Title', this.updateForm.value.title);
        formData.append('Content', this.updateForm.value.content);
        
        if (this.selectedFile) 
        {
          formData.append('Image', this.selectedFile);
        } 

        this.blogService.updateBlog(this.blogId, formData).subscribe({
            error: (err) => {
              this.errorMessage = err.Message;
              console.log(err);
            }
        })

        this.isSubmitting = false;
    }
  }
}