import User from "../app/models/User";
import {Post} from "../app/models/Post";
import {LoginCredential} from "../app/models/login-credential";
import {defer} from "rxjs";
import {environment} from "../environments/environment";
import {Game} from "../app/enums/game";


export const VALID_USER: User = {
  email: "valid@email.com",
  id: 69,
  username: "valid_user"
}

// export const VALID_POST_1: Post = {
//   game: Game,
//   author: VALID_USER,
//   comments: [],
//   id: 1,
//   imageUrl: "",
//   postType: "",
//   content: "sample text",
//   date: new Date()
// }
//
// export const VALID_POST_2: Post = {
//   topic: "",
//   author: VALID_USER,
//   comments: [],
//   id: 2,
//   imageUrl: "",
//   postType: "",
//   content: "sample text again",
//   date: new Date()
// }
//
// export const VALID_POST_ARRAY: Post[] = [VALID_POST_1, VALID_POST_2]
//
// export const VALID_LOGIN_CREDENTIAL: LoginCredential = {
//   email: VALID_USER.email,
//   password: "validPassword"}
//
// export function asyncData<T>(data: T) {
//   return defer(() => {
//     return Promise.resolve(data);
//   })
// }
//
// export function asyncDataFailure<T>(data: T) {
//   return defer(() => {
//     return Promise.reject(data);
//   })
// }
//
// export function setHttpAuth() : any {
//   let headers: any = environment.headers;
//   headers["Authorization"]= <string>localStorage.getItem("Authorization");
//   return headers;
// }
