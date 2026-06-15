import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { RouterModule, RouterOutlet } from "@angular/router";
import { CommonModule } from '@angular/common';
import { IValidationResponse } from '../../../Core/Models/Common/IValidationResponse'; 
import { environment } from '../../../../environments/environment.development'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './profile-layout.html',
  styleUrl: './profile-layout.css',
})
export class ProfileLayout implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  profileForm!: FormGroup;
  activeTab: string = 'blogs';
  isSaving: boolean = false;
  isInitialLoading: boolean = true;

  firstName: string = '';
  lastName: string = '';
  username: string = '';
  email: string = '';
  roleName: string[] = ['User'];
  
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  userProfileImage: string | null = null; 
  imageError: string = '';
  domainUrl = environment.baseUrl;

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      Image: [null]
    });

    this.fetchUserProfileData();
  }

  fetchUserProfileData(): void {
    this.isInitialLoading = true;
    this.authService.getUserProfile().subscribe({
      next: (user) => {
        this.username = user.userName;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;

        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName
        });

        if (user.imageUrl) 
        {
          this.userProfileImage = this.domainUrl + user.imageUrl;
          this.imagePreview = this.domainUrl + user.imageUrl;
        } 
        else 
        {
          this.userProfileImage = null;
          this.imagePreview = null;
        }

        this.isInitialLoading = false;
      },
      error: (err) => {
        this.isInitialLoading = false;
      }
    });
  }

  switchTab(tabName: string): void {
    this.activeTab = tabName;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

    if (!allowedTypes.includes(file.type)) {
      this.imageError = 'Only JPG, JPEG, PNG and WEBP are allowed';
      this.selectedFile = null;
      this.imagePreview = this.userProfileImage;
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      this.imageError = 'Image size must be less than 5 MB';
      this.selectedFile = null;
      this.imagePreview = this.userProfileImage;
      return;
    }

    this.imageError = '';
    this.selectedFile = file;
    this.profileForm.patchValue({ Image: this.selectedFile });

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.imageError = '';
    this.profileForm.patchValue({ Image: null });
  }

  get firstNameValid(): IValidationResponse {
    let response: IValidationResponse = { Success: false, Message: "" };
    let firstNameControl = this.profileForm.get('firstName');

    if (!firstNameControl?.touched) return response;

    if (firstNameControl?.errors?.['required'])
      response.Message = "First name is required";
    else if (firstNameControl?.errors?.['minlength'])
      response.Message = `First name must be at least ${firstNameControl.errors?.['minlength']?.requiredLength} characters`;
    else if (firstNameControl?.errors?.['maxlength'])
      response.Message = `First name cannot exceed ${firstNameControl.errors?.['maxlength']?.requiredLength} characters`;
    else
      response.Success = true;

    return response;
  }

  get lastNameValid(): IValidationResponse {
    let response: IValidationResponse = { Success: false, Message: "" };
    let lastNameControl = this.profileForm.get('lastName');

    if (!lastNameControl?.touched) return response;

    if (lastNameControl?.errors?.['required'])
      response.Message = "Last name is required";
    else if (lastNameControl?.errors?.['minlength'])
      response.Message = `Last name must be at least ${lastNameControl.errors?.['minlength']?.requiredLength} characters`;
    else if (lastNameControl?.errors?.['maxlength'])
      response.Message = `Last name cannot exceed ${lastNameControl.errors?.['maxlength']?.requiredLength} characters`;
    else
      response.Success = true;

    return response;
  }

  onUpdateProfile(): void {
    this.profileForm.markAllAsTouched();

    if (this.profileForm.valid && !this.imageError) {
      
      Swal.fire({
        title: 'Save changes?',
        text: 'Are you sure you want to update your profile details?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#7c3aed',
        cancelButtonColor: '#7c6fa0',
        confirmButtonText: 'Yes, save it! 🚀',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isSaving = true;

          const formData = new FormData();
          formData.append('FirstName', this.profileForm.value.firstName);
          formData.append('LastName', this.profileForm.value.lastName);
          
          if (this.selectedFile) {
            formData.append('Image', this.selectedFile);
          }

          this.authService.update(formData).subscribe({
            next: (res) => {
              this.isSaving = false;
              
              this.firstName = this.profileForm.value.firstName;
              this.lastName = this.profileForm.value.lastName;
              
              this.userProfileImage = this.imagePreview;
              this.selectedFile = null;
              
              Swal.fire({
                title: 'Profile Updated!',
                text: 'Your account metadata and profile picture saved successfully.',
                icon: 'success',
                confirmButtonColor: '#7c3aed'
              });
            },
            error: (err) => {
              this.isSaving = false;
              Swal.fire({
                title: 'Update Failed',
                text: err?.error || 'An error occurred while updating your information.',
                icon: 'error',
                confirmButtonColor: '#7c3aed'
              });
            }
          });
        }
      });

    }
  }
}