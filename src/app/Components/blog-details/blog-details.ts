import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogService } from '../../Services/blog.service';
import { Blog } from '../../Core/Models/Blog/Blog';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { CategoryColorDirective } from "../../Core/directives/category-color";

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoryColorDirective],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css'
})
export class BlogDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);

  blog!: Blog;
  isLoading = true;
  errorMessage = '';
  domainUrl = environment.baseUrl;

  ngOnInit(): void {
    this.isLoading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.blogService.getBlogById(id).subscribe({
      next: (data) => {
        this.blog = data;
        this.isLoading = false;
      },
      error: (err) => {
        if(err.status === 404) this.router.navigate(['/not-found']);
      }
    })
  }
}