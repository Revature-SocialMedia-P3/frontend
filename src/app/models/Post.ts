import User from "./User";
import {Game} from "../enums/game";
import {PostComment} from "./post-comment";

export interface Post{
id? : number;
author : User;
date : Date;
youtubeURL? : string;
time : number;
game : Game;
content : string;
postComments? : PostComment[];
}
