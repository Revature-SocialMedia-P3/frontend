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

  constructor(private http: HttpClient, private angularFireAuth: AngularFireAuth, private router: Router) {
    let userString: string | null = localStorage.getItem("User");

    if (userString) {
      this.currentUser = JSON.parse(userString);
      this.changeInUser.next(this.currentUser);
    } else {
      this.router.navigate(["login"])
    }
  }

  login(loginCredential: LoginCredential): Observable<any> {
        return this.http.post<any>(`${this.authUrl}/login`, loginCredential, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  logout(): void{
    localStorage.removeItem("Authorization");
    localStorage.removeItem('User')
    this.currentUser = null;
    this.changeInUser.next(null);
  }

  register(user: User): Observable<any> {
        return this.http.post<any>(`${this.authUrl}/register`, user, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    this.changeInUser.next(this.currentUser);
  }

  getUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/get-user`, user, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  backendLogin(data: any, onSuccess: CallableFunction, onError: CallableFunction, username: string = "") {
    data = data.user.multiFactor.user;

    let token: string = "Bearer " + data.accessToken;
    localStorage.setItem("Authorization", token);

    let user: User = {
      email: data.email,
      username:username || generateUsername("_",0, 255)
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
}
