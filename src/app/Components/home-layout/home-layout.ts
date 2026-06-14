import { Component } from '@angular/core';
import { CreateBlog } from "../create-blog/create-blog";
import { LatestBlogs } from "../latest-blogs/latest-blogs";

@Component({
  selector: 'app-home-layout',
  imports: [CreateBlog, LatestBlogs],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css',
})
export class HomeLayout {
   
}