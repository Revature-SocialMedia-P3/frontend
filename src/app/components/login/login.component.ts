import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {LoginCredential} from "../../models/login-credential";
import {AuthObj} from "../../models/auth-obj";
import User from "../../models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: [""],
    password: [""],
  })


  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.authService.changeInUser.subscribe((user: User | null) => {
      if (user) {
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
      const loginCredential: LoginCredential = {
        email: formValues.email,
        password: formValues.password
      }

      this.authService.login(loginCredential)
    }


  }

  register(): void {
    this.router.navigate(['register']);
  }

}
