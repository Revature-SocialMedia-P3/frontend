import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {AuthService} from "./services/auth.service";
import User from "./models/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  title = 'frontend';
  message:any = null;
  user? : User | null;
  constructor(private authService : AuthService) {}
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
    this.authService.changeInUser.subscribe({
        next: (data : User | null) => {
          this.user = data
        }
    });
  }


  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging,
     { vapidKey: environment.firebaseConfigNotification.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("We got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }
}
