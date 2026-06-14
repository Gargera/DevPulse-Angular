import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Blog } from '../../../Core/Models/Blog/Blog';
import { BlogService } from '../../../Services/blog.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-blogs',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './all-blogs.html',
  styleUrl: './all-blogs.css',
})
export class AllBlogs implements OnInit {
  private blogService = inject(BlogService);
  private router = inject(Router);

  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  
  searchQuery: string = '';
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadBlogsFromServer();
  }

  loadBlogsFromServer(): void {
    this.isLoading = true;
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = this.filteredBlogs = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim();
    
    if (!query) {
      this.filteredBlogs = this.blogs;
      return;
    }

    this.filteredBlogs = this.blogs.filter(blog => 
      blog.title.toLowerCase().includes(query) || 
      blog.categoryName.toLowerCase().includes(query)
    );
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

  editBlog(id: number): void {
    this.router.navigate([`/admin/update/${id}`]);
  }
}