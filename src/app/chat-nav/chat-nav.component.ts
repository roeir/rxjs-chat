import { Component, OnInit } from '@angular/core';

import { Message, MessagesService } from '../message';
import { Thread, ThreadService } from '../thread';

@Component({
  selector: 'app-chat-nav',
  templateUrl: './chat-nav.component.html',
  styleUrls: ['./chat-nav.component.css'],
})

export class ChatNavComponent implements OnInit {
  unreadMessagesCount: number;

  constructor(
    public messageService: MessagesService,
    public threadService: ThreadService
  ) { }

  ngOnInit() {
    this.messageService.message$
      .combineLatest(
        this.threadService.currentThread$,
        (messages: Message[], currentThread: Thread) => {
          this.unreadMessagesCount = messages.reduce(
            (count, message: Message) => {
              const messageInCurrentThread: boolean =
                message.thread &&
                currentThread &&
                (message.thread.id === currentThread.id);

              if (message && !message.isRead && !messageInCurrentThread) {
                count = count + 1;
              }
              return count;
            }, 0
          )
        }
      )
  }
}
