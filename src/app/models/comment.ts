import User from "./User";

export interface ForumComment {
  id? : number,
  postId : number,
  commenter : User,
  date : Date,
  content : string
}
