import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Post} from "../models/Post";
import {PostComment} from "../models/post-comment";
import User from "../models/User";


@Injectable({
  providedIn: 'root',
})
export class PostService {
  postUrl : string = `${environment.baseUrl}/post`;
  // posts: Post[] = [];
  changeInPost: Subject<Post[]> = new BehaviorSubject<Post[]>([]);

  constructor(
    private http : HttpClient
  ) {}

  getAllMyPosts(id : number) : void {
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    this.http.get<Post[]>(`${this.postUrl}/my-feed/${id}`, {headers: headers, withCredentials: environment.withCredentials}).subscribe({
      next: (value: any) => {
        this.changeInPost.next(value as Post[]);
      }, error: err => {
        this.changeInPost.error(err);
      }
    });
  }

  getTopPosts() : void {
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    this.http.get<Post[]>(`${this.postUrl}/top-feed`, {headers: headers, withCredentials: environment.withCredentials}).subscribe({
      next: (value: any) => {
        this.changeInPost.next(value as Post[]);
      }, error: err => {
        this.changeInPost.error(err);
      }
    });
  }

  getLeaderboard() : void{
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    this.http.get<Post[]>(`${this.postUrl}/leaderboard`, {headers: headers, withCredentials: environment.withCredentials}).subscribe({
      next: (value: any) => {
        let postList: Post[] = [];
        Object.keys(value).forEach((key: string) => {
          postList.push(value[key]);
        })
        this.changeInPost.next(postList);
      }, error: err => {
        this.changeInPost.error(err);
      }
    });
  }

  createPost(post : Post)  {
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    return this.http.post<Post>(`${this.postUrl}/upsert`, post, {headers: headers, withCredentials: environment.withCredentials});
  }
  createPostComment(postComment: PostComment) {
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    return this.http.post<PostComment>(`${this.postUrl}/comment`, postComment, {headers : headers, withCredentials : environment.withCredentials});
  }
  getUsersMatching(query : string) {
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    return this.http.get<User[]>(`${this.postUrl}/search?user=${query}`, {headers: headers, withCredentials: environment.withCredentials});
  }
}
