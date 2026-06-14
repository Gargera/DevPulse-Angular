import { Component, inject, Input, OnInit, SimpleChanges} from '@angular/core';
import { BlogCard } from '../blog-card/blog-card';
import { Blog } from '../../Core/Models/Blog/Blog';
import { BlogService } from '../../Services/blog.service';

@Component({
  selector: 'app-latest-blogs',
  imports: [BlogCard],
  templateUrl: './latest-blogs.html',
  styleUrl: './latest-blogs.css',
})
export class LatestBlogs implements OnInit{
  private blogService = inject(BlogService);

  Blogs: Blog[] = [];
  
  ngOnInit(): void {
    //this.Blogs = call api 
  }
}