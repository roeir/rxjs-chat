import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
} from '@angular/core';
import { v4 } from 'uuid';

import { Observable } from 'rxjs/Observable';

import { Message, MessagesService } from '../message';
import { Thread, ThreadService } from '../thread';
import { User, UserService } from '../user';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ChatWindowComponent implements OnInit {
  message$: Observable<Message[]>;
  currentThread: Thread;
  currentUser: User;
  draftMessage: string;
  timeout: any;

  constructor(
    public messageService: MessagesService,
    public threadService: ThreadService,
    public userService: UserService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.message$ = this.threadService.currentThreadMessage$;
    this.threadService.currentThread$
      .subscribe(
        (currentThread: Thread) => {
          this.currentThread = currentThread;
        }
      );
    this.userService.currentUser$
      .subscribe(
        (currentUser: User) => {
          this.currentUser = currentUser;
        }
      );
    this.messageService.message$
      .subscribe(
        () => {
          if (this.timeout) {
            clearInterval(this.timeout);
          }
          this.timeout = setTimeout(() => {
            this.scrollBottom();
          });
        }
      );
  }

  // TODO: send by ENTER KEY clicked
  sendMessage() {
    if (this.draftMessage) {
      const message: Message = {
        id: v4(),
        author: this.currentUser,
        thread: this.currentThread,
        isRead: true,
        sendAt: new Date(),
        text: this.draftMessage,
      };
      this.messageService.addMessage(message);
      this.draftMessage = undefined;
    }
  }

  scrollBottom() {
    const scrollPanel: any = this.el.nativeElement
      .querySelector('.messages-container');
    scrollPanel.scrollTop = scrollPanel.scrollHeight;
  }
}
