import { Component,Input,OnInit } from '@angular/core';
import { LikepostserviceService } from 'src/app/likepostservice.service';

@Component({
  selector: 'app-likepost',
  templateUrl: './likepost.component.html',
  styleUrls: ['./likepost.component.css']
})
export class LikepostComponent {
ngoninit(){}
  constructor(private LikepostService : LikepostserviceService){

  }
addLikeToPost(){
  this.LikepostService.increaseCount();
}
removeLikeFromPost(){
  this.LikepostService.decreaseCount();
}
}
