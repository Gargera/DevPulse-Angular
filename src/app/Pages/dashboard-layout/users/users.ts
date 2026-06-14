import { Component, inject, OnInit} from '@angular/core';
import { UserDto } from '../../../Core/Models/Auth/UserDto';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit{
  private authService = inject(AuthService);
  private router = inject(Router);

  users: UserDto[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.authService.getUsers().subscribe({
        next: (data) => {
          this.users = data
        },
        error: (err) => {
          console.log(err);
           this.router.navigate(['/403']);
        }
    })
  }

  hasAdminRole(roles: string[]): boolean 
  {
    return roles && roles.includes('Admin');
  }
}