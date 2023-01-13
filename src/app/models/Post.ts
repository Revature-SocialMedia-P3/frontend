import User from './User';

export default class Post {
  id?: number;
  topic: string;
  content: string;
  imageUrl: string;
  author: User;
  comments?: Post[];
  postType: string;
  date: Date;


}
