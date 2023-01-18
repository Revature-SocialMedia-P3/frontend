import User from "../app/models/User";
import {Post} from "../app/models/Post";
import {LoginCredential} from "../app/models/login-credential";
import {defer} from "rxjs";
import {Game} from "../app/enums/game";
import {environment} from "../environments/environment";


export const VALID_USER: User = {
  email: "valid@email.com",
  id: 69,
  username: "valid_user"
}

export function setHttpAuth() : any {
  let headers: any = environment.headers;
  headers["Authorization"]= <string>localStorage.getItem("Authorization");
  return headers;
}

export const VALID_POST_1: Post = {
  author: VALID_USER,
  comments: [],
  id: 1,
  date: new Date(),
  time: 42069,
  content: "super awesome record.",
  game: Game.ddnr
}

export const VALID_POST_2: Post = {
  author: VALID_USER,
  comments: [],
  id: 2,
  date: new Date(),
  time: 69420,
  content: "super awesome record.",
  game: Game.ping
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
