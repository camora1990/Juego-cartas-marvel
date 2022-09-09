import { Injectable } from '@angular/core';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private BASE_URL: string = 'ws://localhost:8081/retrieve';
  private socket!: WebSocketSubject<unknown>;
  constructor() {}

  conect(idGame: string): WebSocketSubject<unknown> {
    debugger
    this.socket = webSocket(`${this.BASE_URL}/${idGame}`);
    return this.socket;
  }
  close() {
    this.socket.unsubscribe();
  }
}
