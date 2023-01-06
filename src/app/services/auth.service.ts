import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {LoginCredential} from "../models/login-credential";
import {AuthObj} from "../models/auth-obj";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  currentUser: User | null = null;
  changeInUser: Subject<User | null> = new BehaviorSubject(this.currentUser);

  constructor(private http: HttpClient, private angularFireAuth: AngularFireAuth) { }

  login(loginCredential: LoginCredential): void {


    this.angularFireAuth.signInWithEmailAndPassword(loginCredential.email, loginCredential.password).then(
      (data) => {
        // @ts-ignore
        let token: string = "Bearer " + data.user.multiFactor.user.accessToken;
        localStorage.setItem("Authorization", token);

        this.http.post<any>(`${this.authUrl}/login`, loginCredential, {headers: environment.headers, withCredentials: environment.withCredentials}).subscribe({
          next: (data : any) => {
            this.currentUser = data;
            this.changeInUser.next(this.currentUser);
          }, error: (error: any) =>{
          } })
      }
    ).catch(
      (error) => {
      }

    )
  }

  logout(): void{
    localStorage.removeItem("Authorization");
    this.currentUser = null;
    this.changeInUser.next(null);
  }

  register(user: User): void {
    this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password!).then(
      (data) => {
        // @ts-ignore
        let token: string = "Bearer " + data.user.multiFactor.user.accessToken;
        localStorage.setItem("Authorization", token);

        this.http.post<any>(`${this.authUrl}/register`, user, {headers: environment.headers, withCredentials: environment.withCredentials}).subscribe({
          next: (data: any) => {
            this.currentUser = data;
            this.changeInUser.next(this.currentUser);
          }, error: (error: any) => {

          }
        })
      }
    ).catch()

    return ;
  }
}
