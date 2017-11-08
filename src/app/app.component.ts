import { Component } from '@angular/core';

import { ChatExampleData } from './data/chat-example-data';
import { MessagesService } from './message';
import { ThreadService } from './thread';
import { UserService } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    messageService: MessagesService,
    threadService: ThreadService,
    userService: UserService,
  ) {
    ChatExampleData.init(messageService, threadService, userService);
  }
}
