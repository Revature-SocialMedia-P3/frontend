import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {Post} from "../../models/Post";
import User from "../../models/User";
import {Game} from "../../enums/game";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  game = Game;

  postForm = this.formBuilder.group({
    game: [this.game.notSelected, Validators.compose([]), Validators.required],
    seconds: [0, Validators.compose([]), Validators.required],
    minutes: [0, Validators.compose([]), Validators.required],
    hours: [0, Validators.compose([]), Validators.required],
    content: ["", Validators.compose([]), Validators.maxLength(255), Validators.required],
    youtubeURL: ["", Validators.compose([])],
    }
  )
  @Input()
  user? : User;
  @Output()
  postEvent : EventEmitter<Post> = new EventEmitter<Post>()

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const postValues = this.postForm.value;

    if (
      this.user &&
      postValues.game &&
      postValues.game !== this.game.notSelected &&
      postValues.seconds &&
      postValues.minutes &&
      postValues.hours &&
      postValues.content
    ) {
    let totalSeconds = postValues.seconds + postValues.minutes * 60 + postValues.hours * 3600;

    if (totalSeconds > 0){

      const post: Post = {
        author: this.user,
        game: postValues.game,
        date: new Date(),
        time: totalSeconds,
        content: postValues.content,
      }

      this.postEvent.emit(post);
      this.postForm.reset();
    }
    }

  }
}
