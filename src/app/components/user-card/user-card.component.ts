import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import {FormBuilder, Validators} from "@angular/forms";
import {FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, linkWithPopup, getAuth, EmailAuthProvider} from "firebase/auth";
import {linkWithCredential} from "@angular/fire/auth";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  user!: User;
  isEditProfile: boolean = false;
  isEmailPasswordAuth: boolean = false;
  profileForm = this.formBuilder.group({
    username: ["", Validators.compose([Validators.required, Validators.maxLength(255)])],
    email: ["", Validators.compose([Validators.required, Validators.maxLength(255), Validators.email])]
  })

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser()!;
    this.profileForm.get("username")?.setValue(this.user.username);
    this.profileForm.get("email")?.setValue(this.user.email);
  }

  OAuth(providerString: string) {
      let provider: any;

      if (providerString === "google") {
        provider = new GoogleAuthProvider();
      } else if (providerString === "facebook") {
        provider = new FacebookAuthProvider();
      } else if (providerString === "github") {
        provider = new GithubAuthProvider();
      } else if (providerString === "email") {
        const credential = EmailAuthProvider.credential("", "");
        linkWithCredential(getAuth().currentUser!, credential).then().catch()
      }

      linkWithPopup(getAuth().currentUser!, provider).then(r => {
        console.log("it works")
      }).catch(e => {
        console.log("it didnt work", e)
      })
  }
}
