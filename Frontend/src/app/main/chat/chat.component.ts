import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Message } from './message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  currentMessage = '';

  loggedInUser: string | null;
  websocket: WebSocket;
  messageQueue: string[] = [];

  constructor(private userService: UserService,
              private websocketService: WebsocketService) {

    this.websocket = this.websocketService.createNew();
    this.websocket.onopen = (event: Event) => {
      const userString = sessionStorage.getItem('auth-user');
      let user = { id: '', username: '' };

      if (userString) {
        user = JSON.parse(userString);
      }
      let message: Message = {
        type: 'JOINED',
        from: user.id,
        fromUserName: user.username,
        message: ''
      }
      this.websocket.send(JSON.stringify(message));
    }
    this.startListening();
  }

  startListening() {
    this.websocket.onmessage = (event: MessageEvent) => {
      this.currentMessage = event.data;
    };
  }

  sendMessage(message: string) {
    if (this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(message);
    } else {
      this.messageQueue.push(message);
    }
  }

  private doLogout() {}

  recieveMessage(message: string) {
    this.sendMessage(message);
  }

  @HostListener('window:beforeunload')
  close() {
    const userString = sessionStorage.getItem('auth-user');
    let user = { id: '', username: '' };

    if (userString) {
      user = JSON.parse(userString);
    }
    let message: Message = {
      type: 'LEFT',
      from: user.id,
      fromUserName: user.username,
      message: ''
    }
    this.websocket.send(JSON.stringify(message));
  }

  ngOnInit(): void {}
}
