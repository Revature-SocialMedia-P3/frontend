import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularFireModule} from "@angular/fire/compat";
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';

import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { AngularFireAuthModule} from "@angular/fire/compat/auth";
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { SplashComponent } from './components/splash/splash.component';





initializeApp(environment.firebaseConfigNotification);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostFeedPageComponent,
    PostComponent,
    CommentComponent,
    UserCardComponent,
    NavbarComponent,
    ResetPasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfigNotification),
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // FirebaseTSApp.init(environment.firebaseConfigNotification);
  }

  
 }
