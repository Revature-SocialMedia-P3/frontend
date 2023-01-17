import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/Post";
import User from "../../models/User";
import {AuthService} from "../../services/auth.service";
import {PostService} from "../../services/post.service";
import {PostComment} from "../../models/post-comment";

@Component({
  selector: 'app-top-feed',
  templateUrl: './top-feed.component.html',
  styleUrls: ['./top-feed.component.css']
})
export class TopFeedComponent implements OnInit {
  togglePost: boolean = false;
  toggleComment: boolean = false;
  Posts!: Post[];
  selectedPost?: Post;
  selectedPostId? : number;
  isUserLoggedIn: boolean = true;
  user! : User;
  constructor(
    public authService : AuthService,
    private postService : PostService
  ) { }

  ngOnInit(): void {

    this.authService.changeInUser.subscribe({
      next : (data : User | null) => {
        this.user = data!;
      }});
    this.postService.changeInPost.subscribe({
      next: () => {
        this.postService.getTopPosts().subscribe({
          next: (data: Post[]) => {
            this.Posts = data;
          }, error: err => {
            console.log(err);
          }
        });
      }
    })
  }

  onSelectPost(post: Post) {
    this.selectedPost = post;
    this.selectedPostId = post.id;
  }

  hideComments() {

  }

  onSubmitPostComment(postComment : PostComment) {
    this.postService.createPostComment(postComment).subscribe({
      next : (data : any) => {
        console.log(data.body);
        this.postService.changeInPost.next();
      }
    })
  }
}
