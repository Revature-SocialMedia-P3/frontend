import { Component, OnInit } from '@angular/core';
import {Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {FormBuilder} from "@angular/forms";
import User from "../../../models/User";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Registration} from "../../../models/registration";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSubmitted: boolean = false;
  errorMessage?: string;
  registerForm = this.formBuilder.group({
    username: ["", Validators.compose([Validators.required, Validators.maxLength(255)])],
    email: ["", Validators.compose([Validators.required, Validators.maxLength(255), Validators.email])],
    password: ["", Validators.compose([Validators.required, Validators.maxLength(255)])]
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
        (data: any) => {
          this.authService.backendLogin(data, () => {this.isSubmitted = false;}, ()=> {this.isSubmitted = false;
            this.errorMessage = "Failed to register. Please try again.";}, registration.username)
        }).catch((error: any) => {
        if (error.code == "auth/email-already-in-use") {
          this.errorMessage = "Failed to register. This email is already in use. If you logged in previously with an account like facebook or google, please use the same method.";
          this.isSubmitted = false;
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
