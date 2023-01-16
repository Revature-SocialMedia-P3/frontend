import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {PostService} from "../../services/post.service";



@Component({
  selector: 'app-post-feed-page',
  templateUrl: './post-feed-page.component.html',
  styleUrls: ['./post-feed-page.component.css'],
})
export class PostFeedPageComponent implements OnInit {
  togglePost: boolean = false;
  isUserLoggedIn! : boolean;


  constructor(
    private postService : PostService,
    private authService : AuthService,
  ) {}

  ngOnInit(): void {
  }
}
