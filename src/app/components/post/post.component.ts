import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup , Validators} from "@angular/forms";
import { outputAst } from '@angular/compiler';
import User from "../../models/User";
import Post from "../../models/Post";


@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.css']
})
export class PostComponent implements OnInit {

  topic = new FormControl("", Validators.compose([Validators.required, Validators.maxLength(255)]));
  content = new FormControl("", Validators.compose([Validators.required, Validators.maxLength(255)]))

  postForm = new FormGroup({
    topic : this.topic,
    content : this.content
  })

  @Input()
  user? : User;

  @Output()
  postEvent : EventEmitter<Post> = new EventEmitter<Post>()

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

    const postValues = this.postForm.value;

    if (
      this.user &&
      postValues.topic &&
      postValues.content
    ){

      const post : Post = {
        postType: "",
        imageUrl: "",
        author : this.user,
        topic : postValues.topic,
        date : new Date(),
        content : postValues.content
      }

      this.postEvent.emit(post)
      this.postForm.reset()
    }
  }
}
