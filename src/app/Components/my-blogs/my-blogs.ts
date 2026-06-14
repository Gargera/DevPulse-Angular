import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { Blog } from '../../Core/Models/Blog/Blog';
import { BlogService } from '../../Services/blog.service';
import { TruncatePipe } from '../../Core/pipes/truncate-pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, TruncatePipe],
  templateUrl: './my-blogs.html',
  styleUrl: './my-blogs.css',
})
export class MyBlogs implements OnInit {
  private blogService = inject(BlogService);
  private router = inject(Router);

  myBlogs: Blog[] = [];
  isLoading: boolean = true;
  isDashboardMode: boolean = false;

  ngOnInit(): void {
    this.isDashboardMode = this.router.url.includes('admin');
    this.loadBlogsFromServer();
  }

  loadBlogsFromServer(): void {
    this.isLoading = true;
    this.blogService.getMyBlogs().subscribe({
      next: (data) => {
        this.myBlogs = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        if (err?.error?.status === 401) {
          this.router.navigate(["/403"]);
        } else {
          console.log(err);
        }
      }
    });
  }

  deleteBlog(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this article permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7c3aed',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Yes, delete it! 🗑️',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.blogService.deleteBlog(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'The article has been deleted successfully.',
              icon: 'success',
              confirmButtonColor: '#7c3aed'
            });
            this.loadBlogsFromServer();
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
            Swal.fire({
              title: 'Error!',
              text: 'Could not delete the article. Please try again.',
              icon: 'error',
              confirmButtonColor: '#7c3aed'
            });
          }
        });
      }
    });
  }
}