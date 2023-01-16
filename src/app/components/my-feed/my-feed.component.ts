import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/Post";
import {AuthService} from "../../services/auth.service";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-my-feed',
  templateUrl: './my-feed.component.html',
  styleUrls: ['./my-feed.component.css']
})
export class MyFeedComponent implements OnInit {

  togglePost: boolean = false;
  toggleComment: boolean = false;
  forumPosts!: Post[];
  selectedPost?: Post;
  selectedPostId? : number;
  isUserLoggedIn: boolean = true;
  constructor(
    public authService : AuthService,
    private postService : PostService
  ) {}

  ngOnInit(): void {
  }

  onSelectPost(post: Post) {
    this.selectedPost = post;
    this.selectedPostId = post.id;
  }

  onSubmitPost($event: Post) {

  }
}
