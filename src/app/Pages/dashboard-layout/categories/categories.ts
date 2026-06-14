import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../Core/Models/Category/Category';
import { CategoryService } from '../../../Services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit{
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  categories: Category[] = [];
  isLoading: boolean = false;
  categoryName: string = '';
  
  isEditMode: boolean = false;
  editingCategoryId: number | null = null;

  ngOnInit(): void {
     this.categoryService.getCategories().subscribe({
      next: (data) => {this.categories = data},
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteCategory(id: number)
  {
     this.categoryService.deleteCategory(id).subscribe({
      error: (err) => {
        if(err?.error?.status === 404) this.router.navigate(['/not-found']);
        else this.router.navigate(['/403']);
      }
     })
  }

  selectCategoryForEdit(cat: Category)
  {

  }

  resetForm()
  {
     
  }

  onSubmit() 
  {
     
  }
}
