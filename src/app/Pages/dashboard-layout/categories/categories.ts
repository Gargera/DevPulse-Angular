import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../Core/Models/Category/Category';
import { CategoryService } from '../../../Services/category.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  categories: Category[] = [];
  isLoading: boolean = false;
  categoryName: string = '';
  errorMessage: string = '';
  
  isEditMode: boolean = false;
  editingCategoryId: number = 0;

  ngOnInit(): void {
    this.loadCategoriesFromServer();
  }

  loadCategoriesFromServer(): void {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

  deleteCategory(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Deleting this category will also delete all associated blogs!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7c3aed',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Yes, delete it! 🗑️',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'The category has been deleted successfully.',
              icon: 'success',
              confirmButtonColor: '#7c3aed'
            });
            this.loadCategoriesFromServer();
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
            if (err?.error?.status === 404) 
            {
              this.router.navigate(['/not-found']);
            }
            else
            {
              this.router.navigate(['/403']);
            }
          }
        });
      }
    });
  }

  selectCategoryForEdit(cat: Category): void {
    this.isEditMode = true;
    this.categoryName = cat.name;
    this.editingCategoryId = cat.id;
    this.errorMessage = '';
  }

  resetForm(): void {
    this.isLoading = false;
    this.categoryName = '';
    this.isEditMode = false;
    this.editingCategoryId = 0;
    this.errorMessage = '';
  }

  onSubmit(): void {
    this.errorMessage = '';
    const cat = { name: this.categoryName.trim() };

    this.isLoading = true;

    if (this.isEditMode) {
      this.categoryService.updateCategory(this.editingCategoryId, cat).subscribe({
        next: () => {
          Swal.fire({
            title: 'Updated!',
            text: 'Category has been successfully updated.',
            icon: 'success',
            confirmButtonColor: '#7c3aed'
          });
          this.resetForm();
          this.loadCategoriesFromServer();
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          if (err?.error?.status === 404) 
          {
            this.router.navigate(['/not-found']);
          }
          else if(err?.error?.status === 401)
          {
            this.router.navigate(['/403']);
          }
          else
          {
            this.errorMessage = err?.error;
          }
        }
      });
    } 
    else 
    {
      this.categoryService.createCategory(cat).subscribe({
        next: () => {
          Swal.fire({
            title: 'Created!',
            text: 'New category has been successfully registered.',
            icon: 'success',
            confirmButtonColor: '#7c3aed'
          });
          this.resetForm();
          this.loadCategoriesFromServer();
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          if(err?.error?.status === 401)
          {
            this.router.navigate(['/403']);
          }
          else
          {
            this.errorMessage = err?.error;
          }
        }
      });
    }
  }
}