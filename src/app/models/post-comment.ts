import User from "./User";

export interface PostComment{
  id? : number,
  postId : number,
  commenter : User,
  date : Date,
  content : string
}
