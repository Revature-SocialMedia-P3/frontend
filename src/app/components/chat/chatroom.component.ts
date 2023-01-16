import { Component } from '@angular/core';
import { ChatService } from './socketio.service';



@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
  })
export class AppComponent {
  newMessage: string;
  messageList: string[] = [];

  constructor(private chatService: ChatService){

  }

  ngOnInit(){
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}