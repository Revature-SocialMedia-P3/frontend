import { Component, OnInit } from '@angular/core';

import {Observable, tap} from "rxjs";
import Post from "../../models/Post";
import {PostService} from "../../services/post.service";
import {AuthService} from "../../services/auth.service";
import User from "../../models/User";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class PostFeedPageComponent implements OnInit {
  togglePost: boolean = false;
  toggleComment: boolean = false;
  forumPosts!: Post[];
  selectedPost?: Post;
  selectedPostId? : number;
  isUserLoggedIn!: boolean;
  spinner: boolean = true;

  constructor(
    private postService: PostService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.changeInUser.subscribe({
      next: (user: User | undefined) => {
        this.isUserLoggedIn = this.authService.isUserLoggedIn()
      },
    })

    this.postService.changeInForumPost.subscribe({
      next: () => {
        this.postService.getAllForumPosts().subscribe({
          next: (data: any) => {
            console.log(data.body as Post[]);
            this.forumPosts = data.body as Post[];
            this.spinner = false;
            if (this.selectedPost){
              this.selectedPost = this.forumPosts.filter((post : Post ) => post.id === this.selectedPostId)[0];
            }
          },
          error: (error: string) => {
            console.error(error);
          },
        });
      },
    });
    this.postService.changeInForumPost.next(undefined);
    this.isUserLoggedIn = this.authService.isUserLoggedIn();

    this.authService.changeInUser.subscribe({
        next: (user: User | undefined) => {
          if (user === undefined) {
            this.isUserLoggedIn = this.userService.isUserLoggedIn();
          }
        }
      }
    )
  }

  onSelectPost(post: Post) {
    this.selectedPost = post;
    this.selectedPostId = post.id;
  }

  onSubmitPost(forumPost: Post) {
    this.postService.submitForumPost(forumPost).subscribe({
      next : (data : any) => {
        console.log(data.body)
        this.postService.changeInForumPost.next(undefined);
      }
    });

  }

  onSubmitComment(forumComment: Comment) {
    this.postService.submitForumComment(forumComment).subscribe({
      next : (data : any) => {
        console.log(data.body)
        this.postService.changeInForumPost.next(undefined);
      }
    });

  }

  hideComments() {
    this.toggleComment = false;
  }
}
