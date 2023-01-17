import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import { Post } from 'src/app/models/Post';
import User from "../../models/User";
import {PostComment} from "../../models/post-comment";



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  commentForm = this.formBuilder.group({
    content : ["",Validators.compose([Validators.required, Validators.maxLength(255)])]
  })

  @Input()
  user? : User;

  @Input()
  selectedPost! : Post;

  @Output()
  commentEvent : EventEmitter<PostComment> = new EventEmitter<PostComment>()
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {}

  onSubmit() {
    const commentValues =this.commentForm.value;

    if (
      this.user &&
      commentValues.content &&
      this.selectedPost.id !== undefined
    ){
      const postComment : PostComment = {
        commenter : this.user,
        content : commentValues.content,
        date : new Date(),
        postId : this.selectedPost.id
      }
      this.commentEvent.emit(postComment);
      this.commentForm.reset();
    }
  }
}
