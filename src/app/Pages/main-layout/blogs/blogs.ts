import { Component, inject, OnInit } from '@angular/core';
import { Blog } from '../../../Core/Models/Blog/Blog';
import { FormsModule } from '@angular/forms';
import { BlogCard } from '../../../Components/blog-card/blog-card';
import { Category } from '../../../Core/Models/Category/Category';
import { BlogService } from '../../../Services/blog.service';
import { CategoryService } from '../../../Services/category.service';

@Component({
  selector: 'app-blogs',
  imports: [FormsModule, BlogCard],
  templateUrl: './blogs.html',
  styleUrl: './blogs.css',
})
export class Blogs implements OnInit{
  private blogService = inject(BlogService);
  private categoryService = inject(CategoryService);

  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  categories: Category[] = [];
  selectedCategory: number | null = null;
  selectedCategoryName: string = "All Categories";
  isDropdownOpen: boolean = false;
  searchQuery = '';
  isLoading = false;

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

    this.categoryService.getCategories().subscribe({
      next: (data) => {this.categories = data},
      error: (err) => {
        console.log(err);
      }
    })

    this.isLoading = false;
  }

  onSearch() 
  {
    this.filteredBlogs = this.blogs.filter(b =>
      b.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(catId: number | null, catName: string): void {
    this.selectedCategory = catId;
    this.selectedCategoryName = catName;
    this.isDropdownOpen = false;
    this.onCategoryChange();
  }

  onCategoryChange() 
  {
    if (this.selectedCategory) 
    {
      this.isLoading = true;
      this.blogService.getBlogsByCategory(this.selectedCategory).subscribe({
        next: (data) => {this.filteredBlogs = data},
        error: (err) => {
          console.log(err);
        }
      })
      this.isLoading = false;
    } 
    else 
    {
      this.filteredBlogs = [...this.blogs];
    }
  }

  clearSearch() 
  { 
    this.searchQuery = ''; 
    this.onSearch(); 
  }

  resetFilters() 
  { 
    this.searchQuery = ''; 
    this.selectCategory(null, 'All Categories');
    this.filteredBlogs = [...this.blogs]; 
  }
}
