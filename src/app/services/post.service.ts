import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import Post from '../models/Post';
import {AuthService} from "./auth.service";
import {setHttpAuth} from "../../tools/tools";

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postUrl: string = `${environment.baseUrl}/post`;
  changeInForumPost: Subject<undefined> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  getAllForumPosts(): Observable<unknown> {
    return this.http.get(`${this.postUrl}/forum/posts`, {
      headers: setHttpAuth(),
      responseType: 'json',
      observe: 'response' as 'body',
    });
  }

  submitPost(post: Post) {
    return this.http.post(`${this.postUrl}/forum/posts/submit`, post, {
      headers: setHttpAuth(),
      responseType: 'text',
      observe: 'response' as 'body',
    });
  }
  submitForumComment(comment: Comment) {
    return this.http.post(`${this.postUrl}/forum/comments/submit`, comment, {
      headers: setHttpAuth(),
      responseType: 'text',
      observe: 'response' as 'body',
    });
  }
}
