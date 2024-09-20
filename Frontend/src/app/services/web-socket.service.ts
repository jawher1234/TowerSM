import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
  private stompClient: any;
  private socket: WebSocket;
  public messages: Subject<any>;
  private planePositionSubject = new Subject<any>();
  constructor() {
    this.messages = new Subject<any>();
  }

  public connect() {
    let ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function(frame: any) {
      _this.stompClient.subscribe("/topic/userPosition", (message: { body: any; }) => {
        if(message.body) {
          // Émettre les données reçues aux abonnés
          const positionUpdate = JSON.parse(message.body);
          _this.planePositionSubject.next(positionUpdate);
        }
      });
    });
  }

  public getPositionUpdates(): Observable<any> {
    return this.planePositionSubject.asObservable();
  }
  public disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

 
}
