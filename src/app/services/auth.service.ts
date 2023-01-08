import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, timeout} from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {LoginCredential} from "../models/login-credential";
import {AuthObj} from "../models/auth-obj";
import {Router} from "@angular/router";

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
}
