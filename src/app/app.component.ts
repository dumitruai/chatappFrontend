
import {Component, OnInit} from '@angular/core';
import Pusher from 'pusher-js';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username = '';
  message = '';
  messages = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('84fcf6a34f3c45cbc922', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {
      this.messages.push(data);
    });
  }

  getTime(){
    return Date.now();
  }

  submit(): void {
    this.http.post('http://localhost:8000/api/messages', {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = '');
  }
}
