import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../Core/Models/Blog/Blog';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  private apiUrl = environment.baseUrl + "/api/blog"
  private http = inject(HttpClient);

 getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getBlogById(id: number): Observable<Blog> 
  {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  getBlogsByCategory(categoryId: number): Observable<Blog[]> 
  {
    return this.http.get<Blog[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  getMyBlogs(): Observable<Blog[]> 
  {
    return this.http.get<Blog[]>(`${this.apiUrl}/my-blogs`);
  }

  createBlog(blogData: FormData): Observable<any> 
  {
    return this.http.post(`${this.apiUrl}/create`, blogData);
  }

  updateBlog(id: number, blogData: FormData): Observable<any> 
  {
    return this.http.put(`${this.apiUrl}/update/${id}`, blogData);
  }

  deleteBlog(id: number): Observable<any> 
  {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}