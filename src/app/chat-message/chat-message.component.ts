import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import { Message, MessagesService } from '../message';
import { Thread, ThreadService } from '../thread';
import { User, UserService } from '../user';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
})

export class ChatMessageComponent implements OnInit {
  @Input('message') message: Message;
  currentUser: User;
  incoming: boolean;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    this.userService.currentUser$
      .subscribe(
        (currentUser: User) => {
          this.currentUser = currentUser;
          if (this.message.author && currentUser) {
            this.incoming = this.message.author.id !== currentUser.id;
          }
        }
      );
  }
}
