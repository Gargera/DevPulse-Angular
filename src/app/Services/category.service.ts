import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Core/Models/Category/Category';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.baseUrl + "/category"; 
  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> 
  {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<Category> 
  {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: any): Observable<any> 
  {
    return this.http.post(`${this.apiUrl}/create`, category);
  }

  updateCategory(id: number, category: any): Observable<any> 
  {
    return this.http.put(`${this.apiUrl}/update/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> 
  {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}