import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Post from "../../models/Post";
import User from "../../models/User";


@Component({
  selector: 'app-forum-comment',
  templateUrl: './forum-comment.component.html',
  styleUrls: ['./forum-comment.component.css']
})
export class CommentComponent implements OnInit {

  content = new FormControl("", Validators.compose([Validators.required, Validators.maxLength(255)]));

  commentForm = new FormGroup({
    content : this.content
  })

  @Input()
  user? : User;

  @Input()
  selectedPost! : Post;

  @Output()
  commentEvent : EventEmitter<Comment> = new EventEmitter<Comment>()

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

    const commentValues = this.commentForm.value;

    if (
      this.user &&
      commentValues.content &&
      this.selectedPost.id !== undefined
    ){


      const forumComment : Comment = {
        commenter : this.user,
        content : commentValues.content,
        date : new Date(),
        postId : this.selectedPost.id
      }

      this.commentEvent.emit(forumComment);
      this.commentForm.reset()
    }
  }
}
