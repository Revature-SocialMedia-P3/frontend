import { Component, OnInit } from '@angular/core';
import {Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {FormBuilder} from "@angular/forms";
import User from "../../models/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    firstName: ["", Validators.compose([Validators.required])],
    lastName: ["", Validators.compose([Validators.required])],
    email: ["", Validators.compose([Validators.required])],
    password: ["", Validators.compose([Validators.required])]
  })

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.authService.changeInUser.subscribe((user: User | null) => {
      if (user) {
        this.router.navigate(['post-feed'])
      }
    })
  }

  onSubmit(): void {
    let formValues = this.registerForm.value;

    if (
      formValues.email &&
      formValues.password &&
      formValues.firstName &&
      formValues.lastName &&
      this.registerForm.valid
    ) {
      const user: User = {
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        password: formValues.password
      }

      this.authService.register(user)
    }
  }
}
