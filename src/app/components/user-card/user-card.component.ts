import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import {FormBuilder, Validators} from "@angular/forms";
import {FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, linkWithPopup, getAuth, EmailAuthProvider, updateEmail, getIdToken} from "firebase/auth";
import {linkWithCredential} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  user!: User;
  isEditProfile: boolean = false;
  isEmailPasswordAuth: boolean = false;
  isEmailPasswordAuthSubmitted: boolean = false;
  isEditProfileSubmitted: boolean = false;
  profileForm = this.formBuilder.group({
    username: ["", Validators.compose([Validators.required, Validators.maxLength(255)])],
    emailEdit: ["", Validators.compose([Validators.required, Validators.maxLength(255), Validators.email])],
  })

  emailPasswordForm = this.formBuilder.group({
    emailAuth: ["", Validators.compose([Validators.required, Validators.maxLength(255), Validators.email])],
    password: ["", Validators.compose([Validators.required, Validators.maxLength(255)])],
  })
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.authService.changeInUser.subscribe({
      next: (user) => {
        if (user) {
          this.user = user!;
          this.profileForm.get("username")?.setValue(this.user.username);
          this.profileForm.get("emailEdit")?.setValue(this.user.email);
          this.emailPasswordForm.get("emailAuth")?.setValue(this.user.email);
        }
      }
    })
  }

  async OAuth(providerString: string) {
      let provider: any;

      if (providerString === "google") {
        provider = new GoogleAuthProvider();
      } else if (providerString === "facebook") {
        provider = new FacebookAuthProvider();
      } else if (providerString === "github") {
        provider = new GithubAuthProvider();
      } else if (providerString === "email") {
        const formValues = this.emailPasswordForm.value

        if (
          formValues.emailAuth &&
          formValues.password &&
          this.emailPasswordForm.valid
        ) {
          this.isEmailPasswordAuthSubmitted = true;
          const credential = EmailAuthProvider.credential(formValues.emailAuth, formValues.password);
          await linkWithCredential(getAuth().currentUser!, credential).then(
            (data: any) => {
              console.log("email works")
              this.isEmailPasswordAuthSubmitted = false;
              this.isEmailPasswordAuth = false;
              this.errorMessage = "";
            }
          ).catch(
            (error: any) => {
              console.log("email didnt work", error)
              this.errorMessage = "This requires a recent login so please log out and log in again and retry."
              this.isEmailPasswordAuthSubmitted = false;
              this.isEmailPasswordAuth = false;
            }
          )
        }
        return;
      }

      linkWithPopup(getAuth().currentUser!, provider).then(r => {
        console.log("it works")
      }).catch(e => {
        console.log("it didnt work", e)
      })
  }

  onSubmit() {
    const formValues = this.profileForm.value;
    this.isEditProfileSubmitted = true;

    if (
      formValues.username === this.user.username &&
      formValues.emailEdit === this.user.email
    ) {
      this.isEditProfileSubmitted = false;
      this.isEditProfile = false;
      this.errorMessage = "";
      return;
    }

    if (
      formValues.emailEdit &&
      formValues.emailEdit !== this.user.email &&
      this.profileForm.get("emailEdit")?.valid
    ) {
      updateEmail(getAuth().currentUser!, formValues.emailEdit).then(
        () => {
          let updatedUser: User = {...this.user}
          updatedUser.email = getAuth().currentUser?.email!
          if (
            formValues.username &&
            formValues.username !== this.user.username &&
            this.profileForm.get("username")?.valid
          ) {
            updatedUser.username = formValues.username;
          }

          getIdToken(getAuth().currentUser!).then((value) => {
            localStorage.setItem("Authorization", "Bearer " + value)
          })

          this.authService.updateUser(updatedUser).subscribe({
            next: (data: any) => {
              this.user = data as User;
              this.authService.changeInUser.next(this.user);
              localStorage.setItem("User", JSON.stringify(this.user));
            },error: (error: any) => {
              // this.user = updatedUser;
              // this.authService.changeInUser.next(this.user);
              // localStorage.setItem("User", JSON.stringify(this.user));
          }
          })
        }
      ).catch(
        (error: any) => {
          this.isEditProfileSubmitted = false;
          this.errorMessage = "This requires a recent login so please log out and log in again and retry."
          return;
        }
      )
      this.isEditProfileSubmitted = false;
      this.isEditProfile = false;
      this.errorMessage = "";
    } else if (
      formValues.username &&
      formValues.username !== this.user.username &&
      this.profileForm.get("username")?.valid
    ) {
      let updatedUser: User = {...this.user}
      updatedUser.username = formValues.username;
      this.authService.updateUser(updatedUser).subscribe({
        next: (data: any) => {
          this.user = data as User;
          this.authService.changeInUser.next(this.user);
          localStorage.setItem("User", JSON.stringify(this.user));
          this.isEditProfileSubmitted = false;
          this.isEditProfile = false;
          this.errorMessage = "";
        }, error: (error: any) => {
          // this.user = updatedUser;
          // this.authService.changeInUser.next(this.user);
          // localStorage.setItem("User", JSON.stringify(this.user));
          this.isEditProfileSubmitted = false;
          this.isEditProfile = false;
          this.errorMessage = "";
        }
      })}
  }
}
