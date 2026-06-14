import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  isUserLoggedIn: boolean = true;
  isUserAdmin: boolean = true;

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    this.isUserAdmin = this.authService.isAdmin();
  }

  onLogout(): void {
    Swal.fire({
      title: 'Logging Out?',
      text: 'Are you sure you want to end your session?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#7c3aed',
      cancelButtonColor: '#7c6fa0',
      confirmButtonText: 'Yes, Sign Out 👋',
      cancelButtonText: 'Stay Logged In'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logOut();
        this.isUserLoggedIn = false;
        this.isUserAdmin = false;

        Swal.fire({
          title: 'Signed Out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });

        this.router.navigate(['/home']);
      }
    });
  }
}