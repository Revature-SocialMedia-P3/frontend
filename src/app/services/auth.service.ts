import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {LoginCredential} from "../models/login-credential";
import {Router} from "@angular/router";
import {generateUsername} from "unique-username-generator";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  currentUser: User | null = null;
  changeInUser: Subject<User | null> = new BehaviorSubject(this.currentUser);

  constructor(
    private http: HttpClient,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    let userString: string | null = localStorage.getItem("User");

    if (userString) {
      this.setCurrentUser(JSON.parse(userString));
    } else {
      this.router.navigate(["login"])
    }
  }

  logout(): void{
    localStorage.removeItem("Authorization");
    localStorage.removeItem('User')
    this.currentUser = null;
    this.changeInUser.next(null);
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    this.changeInUser.next(this.currentUser);
  }

  getUser(user: User): Observable<any> {
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    return this.http.post<any>(`${this.authUrl}/get-user`, user, {headers: headers, withCredentials: environment.withCredentials});
  }

  getCurrentUser(): User | null{
    return this.currentUser;
  }



  async backendLogin(data: any, onSuccess: CallableFunction, onError: CallableFunction, username: string = "") {
    data = data.user.multiFactor.user;

    let token: string = "Bearer " + data.accessToken;
    localStorage.setItem("Authorization", token);

    let user!: User;
    if (username) {
      user = {
        email: data.email,
        username:username
      }
    } else {
      user = {
        email: data.email,
        username: generateUsername("_",0, 255)
      }
    }

    this.getUser(user).subscribe({
        next: (data : any) => {
          this.setCurrentUser(data as User);
          onSuccess();
        }, error: (error: any) =>{
          onError();
        }
      }
    );
  }

  updateUser(user: User) {
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    return this.http.put<any>(`${this.authUrl}/update-user`, user, {headers: headers, withCredentials: environment.withCredentials});
  }
}
