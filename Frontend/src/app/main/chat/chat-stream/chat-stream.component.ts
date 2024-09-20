import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Message } from '../message';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chat-stream',
  templateUrl: './chat-stream.component.html',
  styleUrls: ['./chat-stream.component.css']
})
export class ChatStreamComponent implements OnInit {

  @Input() inputMessage = '';
  @Output() outputMessage = new EventEmitter<string>();

  message: string = ''; 
  publishedMessage: Message[] = new Array();
  showTypingIndicator: boolean = false;
  typingUser: string = '';
  loggedinUserId: string; // Changed to string to match user ID type

  constructor(private websocketService: WebsocketService) {
    const userString = sessionStorage.getItem('auth-user');
    let userId: string = '';
    if (userString) {
      const user = JSON.parse(userString);
      userId = user.id;
    }
    this.loggedinUserId = userId;
    console.log('Logged in user ID:', this.loggedinUserId); // Debugging
  }

  sendTypeIndicator() {
    const userString = sessionStorage.getItem('auth-user');
    let user = { id: '', username: '' };
    if (userString) {
      user = JSON.parse(userString);
    }
    let message: Message = {
      type: 'TYPING',
      from: user.id,
      fromUserName: user.username,
      message: ''
    };
    this.outputMessage.emit(JSON.stringify(message));
  }

  sendMessage() {
    const userString = sessionStorage.getItem('auth-user');
    let user = { id: '', username: '' };
    if (userString) {
      user = JSON.parse(userString);
    }
    let msg = this.message;
    if (msg === '' || msg === undefined) return;
    let message: Message = {
      type: 'MESSAGE',
      from: user.id,
      fromUserName: user.username,
      message: msg
    };
    this.outputMessage.emit(JSON.stringify(message));
    this.message = '';
  }

  showUserTypingIndicator(username: string) {
    this.typingUser = username;
    this.showTypingIndicator = true;
    setTimeout(() => {
      this.hideUserTypingIndicator();
    }, 1000);
  }

  hideUserTypingIndicator() {
    if (this.showTypingIndicator) {
      this.showTypingIndicator = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const chng = changes['inputMessage'];
    let message: Message = JSON.parse(chng.currentValue);
    console.log('Received message:', message); // Debugging
    if (message.type === 'MESSAGE') {
      this.publishedMessage.push(message);
    } else if (message.type === 'TYPING') {
      if (message.from !== this.loggedinUserId) {
        this.showUserTypingIndicator(message.fromUserName);
      }
    }
  }

  isSentMessage(message: Message): boolean {
    console.log('Checking if sent message:', message.from, this.loggedinUserId); // Debugging
    return this.loggedinUserId === message.from;
  }

  ngOnInit(): void {}
}
