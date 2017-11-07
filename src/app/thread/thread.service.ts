import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

import { values, sortBy } from 'lodash';

import { Thread } from './thread.model';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';

@Injectable()
export class ThreadService {
  thread$: Observable<{ [key: string]: Thread }>;
  orderedThread$: Observable<Thread[]>;
  currentThread$ = new BehaviorSubject<Thread>(null);
  currentThreadMessage$: Observable<Message[]>;

  constructor(
    public messageService: MessagesService
  ) {
    this.thread$ = messageService.message$.map(
      (messages: Message[]) => {
        const threads: {[key: string]: Thread} = {};
        messages.forEach((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] ||
            message.thread;

          const messagesThread = threads[message.thread.id];
          if (!messagesThread.lastMessage ||
            (messagesThread.lastMessage.sendAt.getTime() <= message.sendAt.getTime())) {
              messagesThread.lastMessage = message;
          }
        });
        return threads;
      }
    );

    this.orderedThread$ = this.thread$.map(
      (threadGroup: { [key: string]: Thread }) => {
        const threads: Thread[] = values(threadGroup);
        return sortBy(threads, (t: Thread) => t.lastMessage.sendAt.getTime())
          .reverse();
      }
    );

    this.currentThread$.subscribe(
      this.messageService.markThreadAsRead$
    );

    this.currentThreadMessage$ = this.currentThread$
      .combineLatest(
        this.messageService.message$,
        (currentThread: Thread, messages: Message[]) => {
          if (currentThread && messages.length > 0) {
            return messages
              .filter((message: Message) =>
                (message.thread.id === currentThread.id)
              )
              .map((message: Message) => {
                message.isRead = true;
                return message;
              });
          } else {
            return [];
          }
        }
      );
  }

  setCurrentThread(thread: Thread) {
    this.currentThread$.next(thread);
  }

}

export const ThreadServiceInjectables: Array<any> = [
  ThreadService
];
