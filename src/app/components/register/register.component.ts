import { Component, OnInit } from '@angular/core';
import {Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {FormBuilder} from "@angular/forms";
import User from "../../models/User";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {Registration} from "../../models/registration";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSubmitted: boolean = false;
  errorMessage?: string;
  registerForm = this.formBuilder.group({
    username: ["", Validators.compose([Validators.required])],
    email: ["", Validators.compose([Validators.required])],
    password: ["", Validators.compose([Validators.required])]
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
    let formValues = this.registerForm.value;

    if (
      formValues.email &&
      formValues.password &&
      formValues.username &&
      this.registerForm.valid
    ) {
      this.isSubmitted = true;

      const registration: Registration = {
        email: formValues.email,
        username: formValues.username,
        password: formValues.password
      }

      this.angularFireAuth.createUserWithEmailAndPassword(registration.email, registration.password!).then(
        (data: firebase.auth.UserCredential) => {
          // @ts-ignore
          let token: string = "Bearer " + data.user.multiFactor.user.accessToken;
          localStorage.setItem("Authorization", token);

          this.authService.register(registration).subscribe({
            next: (data: any) => {
              this.authService.setCurrentUser(data as User);
              this.isSubmitted = false;
            }, error: (error: any) => {
              this.isSubmitted = false;
              this.errorMessage = "Failed to register. Please try again.";
            }
          })
        }).catch((error: firebase.FirebaseError) => {
        if (error.code == "auth/email-already-in-use") {
          this.angularFireAuth.signInWithEmailAndPassword(registration.email, registration.password!).then(
            (data: any) => {
              // @ts-ignore
              let token: string = "Bearer " + data.user.multiFactor.user.accessToken;
              localStorage.setItem("Authorization", token);

              this.authService.login({email: registration.email, password: registration.password!}).subscribe({
                  next: (data : any) => {
                    this.authService.setCurrentUser(data as User);
                    this.isSubmitted = false;
                  }, error: (error: any) =>{
                    this.isSubmitted = false;
                    this.errorMessage = "Failed to register. Email already in use.";
                  }
                }
              );
            }
          ).catch((error: firebase.FirebaseError) => {
            this.isSubmitted = false;
            this.errorMessage = "Failed to register. Email already in use.";
          }
          )
        } else if (error.code == "auth/weak-password") {
          this.errorMessage = "Failed to register. Password is too weak.";
          this.isSubmitted = false;
        } else {
          this.errorMessage = "Failed to register. Please try again.";
          this.isSubmitted = false;
        }
      })
    }
  }
}
