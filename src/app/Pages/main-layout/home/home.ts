import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreateBlog } from "../../../Components/create-blog/create-blog";

@Component({
  selector: 'app-home',
  imports: [RouterLink, CreateBlog],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   
}