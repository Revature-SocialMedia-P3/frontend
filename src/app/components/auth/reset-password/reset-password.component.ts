import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isSubmitted: boolean = false;
  errorMessage?: string;
  resetPasswordForm = this.fb.group({
    email: ["", Validators.compose([Validators.required, Validators.maxLength(255), Validators.email])],
  })

  constructor(
    private fb: FormBuilder,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let formValues = this.resetPasswordForm.value;

    if (
      formValues.email &&
      this.resetPasswordForm.valid
    ) {
      this.isSubmitted = true;
      this.angularFireAuth.sendPasswordResetEmail(formValues.email).then(
        () => {
          this.isSubmitted = false;
          this.router.navigate(["login"])
        }
      )
    }
  }
}
