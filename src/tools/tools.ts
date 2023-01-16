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

<<<<<<< HEAD
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
=======
export const VALID_POST_1: Post = {
  author: VALID_USER,
  comments: [],
  id: 1,
  imageUrl: "",
  postType: "",
  text: "sample text"
}

export const VALID_POST_2: Post = {
  author: VALID_USER,
  comments: [],
  id: 2,
  imageUrl: "",
  postType: "",
  text: "sample text again"
}

export const VALID_POST_ARRAY: Post[] = [VALID_POST_1, VALID_POST_2]

export const VALID_LOGIN_CREDENTIAL: LoginCredential = {
  email: VALID_USER.email,
  password: "validPassword"}

export function asyncData<T>(data: T) {
  return defer(() => {
    return Promise.resolve(data);
  })
}

export function asyncDataFailure<T>(data: T) {
  return defer(() => {
    return Promise.reject(data);
  })
}

export const FIREBASE_ERROR_MESSAGES = {
  "auth/account-exists-with-different-credential": "Failed to log in. If you logged in previously with an account like facebook or google, please use the same method.",
  "auth/email-already-in-use": "Failed to register. This email is already in use. If you logged in previously with an account like facebook or google, please use the same method.",
  "auth/weak-password": "Failed to register. Password is too weak.",

}
>>>>>>> a65cc91d2c3b9c655b1a7e5284d62ef31d2071b8
