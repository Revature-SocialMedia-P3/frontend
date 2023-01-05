import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })


  constructor(private authService: AuthService, private router: Router, private angularFireAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  onSubmit(e: any): void {
    e.preventDefault()
    this.angularFireAuth.createUserWithEmailAndPassword(this.registerForm.value.email || "", this.registerForm.value.password || "").then((data) => {
      // @ts-ignore
      let token: string = "Bearer " + data.user.multiFactor.user.accessToken;
      localStorage.setItem("Authorization", token);
    }
    )
    this.authService.register(this.registerForm.value.firstName || "", this.registerForm.value.lastName || "", this.registerForm.value.email || "", this.registerForm.value.password || "")
      .subscribe(
        (response) => {
          this.router.navigate(['login'])
        }
      )
  }
}
