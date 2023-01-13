import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {LoginCredential} from "../../../models/login-credential";
import User from "../../../models/User";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, linkWithPopup} from "firebase/auth";
import {getAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSubmitted: boolean = false;
  errorMessage?: string;
  loginForm = this.formBuilder.group({
    email: ["", Validators.compose([Validators.required, Validators.maxLength(255), Validators.email])],
    password: ["", Validators.compose([Validators.required, Validators.maxLength(255)])],
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private angularFireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.authService.changeInUser.subscribe((user: User | null) => {
      if (user) {
        localStorage.setItem("User", JSON.stringify(user));
        this.router.navigate(['post-feed'])
      }
    })
  }

  onSubmit() {
    let formValues = this.loginForm.value;

    if (
      formValues.email &&
      formValues.password &&
      this.loginForm.valid
    ) {
      this.isSubmitted = true;

      const loginCredential: LoginCredential = {
        email: formValues.email,
        password: formValues.password
      }

      this.angularFireAuth.signInWithEmailAndPassword(loginCredential.email, loginCredential.password).then(
        (data: any) => {
          this.authService.backendLogin(data, () => {this.isSubmitted = false;}, () => {
            this.isSubmitted = false;
            this.errorMessage = "Failed to log in. Please try again.";
          });
    }
    ).catch((error: any) => {
        this.isSubmitted = false;
        this.errorMessage = "Failed to log in. Please try again.";
      })
    }


  }

  OAuth(providerString: string) {
    this.isSubmitted = true;
    let provider: any;

    if (providerString === "google") {
      provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    }
    else if (providerString === "facebook") {
      provider = new FacebookAuthProvider();
    } else if (providerString === "github") {
      provider = new GithubAuthProvider();
    }

    this.angularFireAuth.signInWithPopup(provider).then(
      (data: any) => {
        this.authService.backendLogin(data, () => {this.isSubmitted = false;}, () => {
          this.isSubmitted = false;
          this.errorMessage = "Failed to log in. Please try again.";
        });
      }
    ).catch((error: any) => {
      if (error.code == "auth/account-exists-with-different-credential") {
        this.errorMessage = "Failed to log in. If you logged in previously with an account like facebook or google, please use the same method.";
        this.isSubmitted = false;
      } else {
        this.isSubmitted = false;
        this.errorMessage = "Failed to log in. Please try again.";
      }
    })
  }
}
