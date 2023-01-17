import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
import { PostComponent } from './components/post-form/post.component';
import { CommentComponent } from './components/comment-form/comment.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularFireModule} from "@angular/fire/compat";
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { AngularFireAuthModule} from "@angular/fire/compat/auth";
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { SplashComponent } from './components/splash/splash.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MyFeedComponent } from './components/my-feed/my-feed.component';
import { TopFeedComponent } from './components/top-feed/top-feed.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { ChatComponent } from './components/chat/chat.component';
import { SecondsPipe } from './pipes/seconds.pipe';
import { RemoveSpacesPipe } from './pipes/remove-spaces.pipe';


initializeApp(environment.firebaseConfigNotification);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    CommentComponent,
    UserCardComponent,
    NavbarComponent,
    ResetPasswordComponent,
    SplashComponent,
    TruncatePipe,
    HomepageComponent,
    MyFeedComponent,
    TopFeedComponent,
    LeaderboardComponent,
    ChatComponent,
    SecondsPipe,
    RemoveSpacesPipe,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfigNotification),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor() {
    // FirebaseTSApp.init(environment.firebaseConfigNotification);
  }
 }
