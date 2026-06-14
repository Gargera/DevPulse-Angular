import { Component, inject, Input } from '@angular/core';
import { Blog } from '../../Core/Models/Blog/Blog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryColorDirective } from '../../Core/directives/category-color';
import { environment } from '../../../environments/environment.development';
import { TruncatePipe } from '../../Core/pipes/truncate-pipe';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, CategoryColorDirective, TruncatePipe],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.css',
})
export class BlogCard {
  private router = inject(Router);

  domainUrl = environment.baseUrl;

  @Input() BlogData: Blog = {
    id: 0,
    imageUrl: '',
    title: '',
    content: '',
    categoryName: '',
    userName: '',
    createdAt: new Date()
  };

  goToDetails(): void {
    this.router.navigate(['/blogs', this.BlogData.id]);
  }
}