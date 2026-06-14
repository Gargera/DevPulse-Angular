import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IValidationResponse } from '../../../Core/Models/Common/IValidationResponse';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showPassword = false;
  loginForm: FormGroup;
  responseErrorMessage: string = "";

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get usernameValid(): IValidationResponse 
  {
    let response: IValidationResponse = { Success: false, Message: "" };
    let usernameControl = this.loginForm.get('username');

    if (!usernameControl?.touched) return response;

    if (usernameControl?.errors?.['required'])
      response.Message = "Username is required";
    if(this.responseErrorMessage != "")
      response.Message = this.responseErrorMessage;
    else
      response.Success = true;

    return response;
  }

  get passwordValid(): IValidationResponse 
  {
    let response: IValidationResponse = { Success: false, Message: "" };
    let passwordControl = this.loginForm.get('password');

    if (!passwordControl?.touched) return response;

    if (passwordControl?.errors?.['required'])
      response.Message = "Password is required";
    if(this.responseErrorMessage != "")
      response.Message = this.responseErrorMessage
    else
      response.Success = true;

    return response;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() 
  {
      this.loginForm.markAllAsTouched();
  
      if (this.loginForm.valid) 
      {
        const user = {
          userName: this.loginForm.value.username,
          password: this.loginForm.value.password
        }

        this.authService.logIn(user).subscribe({
          next: (data) => {
            localStorage.setItem('token', data);
            this.router.navigate(['/home']);
            this.loginForm.reset();
            this.responseErrorMessage = "";
          },
          error: (err) => {
            this.responseErrorMessage = err?.error;
          }
        })
      }
    }
}
