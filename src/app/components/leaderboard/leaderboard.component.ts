import { Component, OnInit } from '@angular/core';
import User from "../../models/User";
import {Post} from "../../models/Post";
import {AuthService} from "../../services/auth.service";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  togglePost: boolean = false;
  toggleComment: boolean = false;
  Posts!: { string: Post };
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
        this.postService.getLeaderboard().subscribe({
          next: (data: any) => {
            console.log(data)
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
}
