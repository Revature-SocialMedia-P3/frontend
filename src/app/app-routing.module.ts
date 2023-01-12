import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {ResetPasswordComponent} from "./components/auth/reset-password/reset-password.component";
import { ChatComponent } from './components/chat/chat.component';

import {SplashComponent} from "./components/splash/splash.component";

const routes: Routes = [
  { path: "", component: SplashComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "post-feed", component: PostFeedPageComponent},
  { path: "reset-password", component: ResetPasswordComponent},
  { path: "chatroom", component: ChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
