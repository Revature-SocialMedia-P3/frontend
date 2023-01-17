import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/Post";
import {AuthService} from "../../services/auth.service";
import {PostService} from "../../services/post.service";
import User from "../../models/User";
import {PostComment} from "../../models/post-comment";

@Component({
  selector: 'app-my-feed',
  templateUrl: './my-feed.component.html',
  styleUrls: ['./my-feed.component.css']
})
export class MyFeedComponent implements OnInit {

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
  ) {}

  ngOnInit(): void {
    this.authService.changeInUser.subscribe({
      next : (data : User | null) => {
        this.user = data!;
      }});
    this.postService.changeInPost.subscribe({
      next: () => {
        this.postService.getAllMyPosts(this.user.id!).subscribe({
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

  onSubmitPost(post : Post) {
  this.postService.createPost(post).subscribe({
    next : (data : any) => {
      console.log(data.body);
      this.postService.changeInPost.next();
    }
  })
  }

  onSubmitPostComment(postComment : PostComment) {
    this.postService.createPostComment(postComment).subscribe({
      next : (data : any) => {
        console.log(data.body);
        this.postService.changeInPost.next();
      }
    })
  }

  hideComments() {
    this.toggleComment = false;
  }

}
