import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Blog } from '../../../Core/Models/Blog/Blog';
import { BlogService } from '../../../Services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-blogs',
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
    this.isLoading = true;

    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = this.filteredBlogs = data;
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.isLoading = false;
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

  deleteBlog(id: number): void 
  {
    if (confirm('Are you sure you want to delete this blog permanently?')) {
      this.isLoading = true;
      this.blogService.deleteBlog(id).subscribe({
        next: () => {
          this.blogService.getBlogs().subscribe({
            next: (data) => {
              this.blogs = this.filteredBlogs = data;
            },
            error: (err) => {
              console.log(err);
              this.isLoading = false;
            }
          })
          this.isLoading = false;
        },
        error: (err : any) => {
          console.log(err);
          this.isLoading = false;
        }
      });
    }
  }

  editBlog(id: number) : void
  {
    this.router.navigate([`/admin/update/${id}`]);
  }
}