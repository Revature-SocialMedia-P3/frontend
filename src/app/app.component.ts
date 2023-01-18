import { Component, OnInit } from '@angular/core';
import {AuthService} from "./services/auth.service";
import User from "./models/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  title = 'frontend';
  user? : User | null;
  constructor(private authService : AuthService) {}
  ngOnInit(): void {
    this.authService.changeInUser.subscribe({
        next: (data : User | null) => {
          this.user = data
        }
    });
  }
}

