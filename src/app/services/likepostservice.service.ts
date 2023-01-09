import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikepostserviceService {

  constructor() { }
  count = 0;
  increaseCount(){
    this.count += 1;
  }
  decreaseCount(){
    this.count-= 1;
  }
}
