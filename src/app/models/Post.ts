import User from "./User";
import {Game} from "../enums/game";

export interface Post{
id? : number;
author : User;
date : Date;
youtubeURL? : string;
time : number;
game : Game;
content : string;

// comments? : PostComment[];
}
