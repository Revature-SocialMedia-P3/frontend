import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {LoginCredential} from "../../models/login-credential";
import User from "../../models/User";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {GoogleAuthProvider, FacebookAuthProvider, linkWithPopup} from "firebase/auth";
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
    email: [""],
    password: [""],
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

  onSubmit(): void {
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
        (value: any) => {
          // @ts-ignore
          let token: string = "Bearer " + data.user.multiFactor.user.accessToken;
          localStorage.setItem("Authorization", token);

          this.authService.login(loginCredential).subscribe({
              next: (data : any) => {
                this.authService.setCurrentUser(data as User);
                this.isSubmitted = false;
              }, error: (error: any) =>{
                this.isSubmitted = false;
                this.errorMessage = "Failed to log in. Please try again.";
              }
            }
          );
    }
    ).catch((error: any) => {
        this.isSubmitted = false;
        this.errorMessage = "Failed to log in. Please try again.";
      })
    }


  }

  register(): void {
    this.router.navigate(['register']);
  }

  googleAuth() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.angularFireAuth.signInWithPopup(provider).then(
      (data: any) => {
        console.log(data)
        data = data.user.multiFactor.user;

        let token: string = "Bearer " + data.accessToken;
        localStorage.setItem("Authorization", token);

        let user: User = {
          email: data.email,
          username: data.displayName
        }
        this.authService.setCurrentUser(user);
      }
    )
  }

  facebookAuth() {
    const provider = new FacebookAuthProvider();

    // linkWithPopup(getAuth().currentUser!, providerF)
    this.angularFireAuth.signInWithPopup(provider).then(
      (data: any) => {
        console.log(data);
        data = data.user.multiFactor.user;

        let token: string = "Bearer " + data.accessToken;
        localStorage.setItem("Authorization", token);

        let user: User = {
          email: data.email,
          username: data.displayName
        }
        this.authService.setCurrentUser(user);
      }
    )
  }
}
