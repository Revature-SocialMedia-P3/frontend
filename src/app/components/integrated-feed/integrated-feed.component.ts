import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/Post";
import User from "../../models/User";
import {AuthService} from "../../services/auth.service";
import {PostService} from "../../services/post.service";
import {PostComment} from "../../models/post-comment";

@Component({
  selector: 'app-integrated-feed',
  templateUrl: './integrated-feed.component.html',
  styleUrls: ['./integrated-feed.component.css']
})
export class IntegratedFeedComponent implements OnInit {
  selectedPost? : Post;
  user!: User;
  posts! : Post[];
  postErrorMessage?: string;
  isCommentsVisible: boolean = false;
  isPostFormVisible: boolean = false;
  @Input()
  isChangingFeed!: boolean;
  @Output()
  isChangingFeedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  feed!: string;


  constructor(
    private authService : AuthService,
    private postService : PostService
  ) { }

  ngOnInit(): void {
    this.authService.changeInUser.subscribe({
      next: (value: User | null) => {
        if (value) this.user = value;
      }
    })

    this.postService.changeInPost.subscribe({
      next: (value: Post[]) => {
        this.posts = value;
        this.isChangingFeedChange.emit(false);
      }, error: err => {
        this.postErrorMessage = err;
        this.isChangingFeedChange.emit(false);
      }
    })
  }

  onSubmitPostComment(postComment : PostComment) {
    this.postService.createPostComment(postComment).subscribe({
      next : (data : any) => {
        for (let post of this.posts) {
          if (post.id === data.postId) {
            post.postComments = [data, ...post.postComments!];
          }
        }
        this.postService.changeInPost.next(this.posts);
      }
    })
  }

  onSubmitPost(post : Post) {
    this.postService.createPost(post).subscribe({
      next : (data : any) => {
        if (this.feed !== "leaderboard") {
          this.postService.changeInPost.next([data, ...this.posts]);
        }
      }
    })
  }

  onSelectPost(post: Post) {
    this.selectedPost = post;
  }

  onHideComments() {
    this.isCommentsVisible = false;
  }
}
