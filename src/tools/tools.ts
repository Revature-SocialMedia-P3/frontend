import User from "../app/models/User";
import Post from "../app/models/Post";


export const VALID_USER: User = {
  email: "valid@email.com",
  id: 69,
  username: "valid_user"
}

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
