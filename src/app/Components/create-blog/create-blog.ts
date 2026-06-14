import { Component, EventEmitter, Output, OnInit, inject} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IValidationResponse } from '../../Core/Models/Common/IValidationResponse';
import { Category } from '../../Core/Models/Category/Category';
import { Blog } from '../../Core/Models/Blog/Blog';
import { BlogService } from '../../Services/blog.service';
import { CategoryService } from '../../Services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  imports: [ReactiveFormsModule],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.css',
})
export class CreateBlog implements OnInit {
  private blogService = inject(BlogService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  Id: number = 0;
  imagePreview: string | null = null;
  selectedImage: File | null = null;
  selectedFileName: string = '';
  imageError: string = '';

  blogForm: FormGroup;
  categories: Category[] = [];

  @Output() CreateBlogEvent = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      Title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      Content: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(10000)]],
      Category: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {this.categories = data},
      error: (err) => {
        console.log(err);
      }
    })
  }

  onImageSelected(event: Event)
  {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type))
    {
      this.imageError = 'Only JPG, PNG and WEBP are allowed';
      this.selectedImage = null;
      this.imagePreview = null;
      this.selectedFileName = '';
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize)
    {
      this.imageError = 'Image size must be less than 5 MB';
      this.selectedImage = null;
      this.imagePreview = null;
      this.selectedFileName = '';
      return;
    }

    this.imageError = '';
    this.selectedImage = file;
    this.selectedFileName = file.name;
    
    const reader = new FileReader();
    reader.onload = () =>
    {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  get titleValid() : IValidationResponse
  {
    let response:  IValidationResponse = {Success: false, Message: ""};
    let title = this.blogForm.get('Title');
    if(!title?.touched) return response;

    if(title.errors?.['required']) 
      response.Message = "Title is required.";
    else if(title.errors?.['minlength'])
      response.Message = `Title must be at least ${title.errors?.['minlength']?.requiredLength} characters.`;
    else if(title.errors?.['maxlength'])
      response.Message = `Title cannot exceed ${title.errors?.['maxlength']?.requiredLength} characters.`;
    else 
      response.Success = true;

    return response
  }

  get contentValid() :  IValidationResponse
  {
    let response: IValidationResponse = {Success: false, Message: ""};
    let content = this.blogForm.get('Content');
    if(!content?.touched) return response;

    if(content.errors?.['required']) 
      response.Message = "Content is required.";
    else if(content.errors?.['minlength'])
      response.Message = `Content must be at least ${content.errors?.['minlength']?.requiredLength} characters.`;
    else if(content.errors?.['maxlength'])
      response.Message = `Content cannot exceed ${content.errors?.['maxlength']?.requiredLength} characters.`;
    else 
      response.Success = true;

    return response
  }

  get categoryValid(): IValidationResponse 
  {
    let response: IValidationResponse = {Success: false, Message: ""};
    let category = this.blogForm.get('Category');
    if(!category?.touched) return response;

    if (category?.errors?.['required'])
      response.Message = 'Please select a category';
    else
      response.Success = true;

    return response;
  }

  createBlog() {
    this.blogForm.markAllAsTouched();

    if (this.blogForm.valid && !this.imageError) {
      const sendData = new FormData();
      sendData.append('Title', this.blogForm.value.Title);
      sendData.append('Content', this.blogForm.value.Content);
      sendData.append('CategoryName', this.blogForm.value.Category);

      if (this.selectedImage) {
        sendData.append('ImageFile', this.selectedImage);
      }

      this.blogService.createBlog(sendData).subscribe({
        next: () => {
          this.CreateBlogEvent.emit();
          this.blogForm.reset({ Title: '', Content: '', Category: '' });
          this.imagePreview = null;
          this.selectedFileName = '';
          this.selectedImage = null;
        },
        error: (err) => {
          if(err?.error?.status === 401) this.router.navigate(["/403"]);
          else this.router.navigate(["/not-found"]);
          console.log(err);
        }
      });
    }
  }
}