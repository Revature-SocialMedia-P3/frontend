import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {AuthService} from "../../services/auth.service";
import User from "../../models/User";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  selected = "top-feed";
  user! : User;
  isChangingFeed: boolean = false;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.changeInUser.subscribe({
      next: (value: User | null) => {
        if (value) this.user = value;
      }
    })
    this.postService.getTopPosts();
  }

  selectTop( ){

    this.isChangingFeed = true;
    this.postService.getTopPosts();
  }

  selectLeaderboard() {
    this.postService.getLeaderboard();
  }

  selectMyFeed() {
    this.isChangingFeed = true;
    this.postService.getAllMyPosts(this.user.id!);
  }



}
