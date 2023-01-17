import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import User from "../../models/User";
import {Post} from "../../models/Post";
import {PostComment} from "../../models/post-comment";

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {
  postCommentForm = this.formBuilder.group({
      content: ["", Validators.compose([Validators.maxLength(255), Validators.required])]
    }
  )

  @Input()
  user? : User;
  @Input()
  selectedPost! : Post;
  @Output()
  postCommentEvent : EventEmitter<PostComment> = new EventEmitter<PostComment>()


  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const postCommentValues = this.postCommentForm.value;

    if (
      this.user &&
      postCommentValues.content &&
      this.selectedPost.id !== undefined
    ) {
        const postComment: PostComment = {
          postId: this.selectedPost.id,
          commenter: this.user,
          date: new Date(Date.now()),
          content: postCommentValues.content
        }

        this.postCommentEvent.emit(postComment);
        this.postCommentForm.reset();
      }
    }
}
