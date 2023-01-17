import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Post} from "../models/Post";
import {user} from "@angular/fire/auth";
import {PostComment} from "../models/post-comment";


@Injectable({
  providedIn: 'root',
})
export class PostService {
  postUrl : string = `${environment.baseUrl}/post`;
  changeInPost: Subject<void> = new BehaviorSubject<void>(undefined);

  constructor(
    private http : HttpClient
  ) {}

  getAllMyPosts(id : number) : Observable<Post[]> {
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    return this.http.get<Post[]>(`${this.postUrl}/my-feed/${id}`, {headers: headers, withCredentials: environment.withCredentials});
  }
  getTopPosts() : Observable<Post[]>{
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    return this.http.get<Post[]>(`${this.postUrl}/top-feed`, {headers: headers, withCredentials: environment.withCredentials});
  }
  getLeaderboard() : Observable<Post[]>{
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    return this.http.get<Post[]>(`${this.postUrl}/leaderboard`, {headers: headers, withCredentials: environment.withCredentials});
  }
  createPost(post : Post)  {
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    return this.http.post<Post>(`${this.postUrl}/upsert`, post, {headers: headers, withCredentials: environment.withCredentials});
  }

  createPostComment(comment: PostComment) {
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    return this.http.post<PostComment>(`${this.postUrl}/comment`, comment, {headers : headers, withCredentials : environment.withCredentials});
  }

}
