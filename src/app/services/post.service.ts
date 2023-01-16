import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/Post";
import {user} from "@angular/fire/auth";


@Injectable({
  providedIn: 'root',
})
export class PostService {
  postUrl : string = `${environment.baseUrl}/post`;

  constructor(
    private http : HttpClient
  ) {}

  getAllMyPosts() : Observable<Post[]> {
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    return this.http.get<Post[]>(`${this.postUrl}/my-feed`, {headers: headers, withCredentials: environment.withCredentials});
  }

  upsertPost(post : Post) : Observable<Post> {
    let headers: any = environment.headers;
    headers["Authorization"]= <string>localStorage.getItem("Authorization");
    return this.http.post<Post>(`${this.postUrl}/upsert`, post, {headers: headers, withCredentials: environment.withCredentials});
  }

}
