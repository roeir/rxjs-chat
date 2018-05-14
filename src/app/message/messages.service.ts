import { Injectable } from "@angular/core";

import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { Message } from "./message.model";
import { Thread } from "../thread/thread.model";
import { User } from "../user/user.model";

type MessagesOperation = (messages: Message[]) => Message[];

const initialMessages: Message[] = [];

@Injectable()
export class MessagesService {
  newMessage$ = new Subject<Message>();
  message$: Observable<Message[]>;
  update$ = new Subject<any>();

  create$ = new Subject<Message>();
  markThreadAsRead$ = new Subject<any>();

  constructor() {
    this.message$ = this.update$
      .scan(
        (messages: Message[], operation: MessagesOperation) =>
          operation(messages),
        initialMessages
      )
      .shareReplay(1);
    // .publishReplay(1)
    // .refCount();
    this.create$
      .map((message: Message): MessagesOperation => (messages: Message[]) =>
        messages.concat(message)
      )
      .subscribe(this.update$);

    this.newMessage$.subscribe(this.create$);

    this.markThreadAsRead$
      .map((thread: Thread): MessagesOperation => {
        return (messages: Message[]) => {
          return messages.map((message: Message) => {
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          });
        };
      })
      .subscribe(this.update$);
  }

  // add a new message
  addMessage(message: Message) {
    this.newMessage$.next(message);
  }

  // meekfwbiefhnkwessages from passed thread and not authored by user
  // messages from passed thread and not authored by user
  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessage$.filter(
      (message: Message) =>
        message.thread.id === thread.id && message.author.id !== user.id
    );
  }
}

export const messageServiceInjectables: Array<any> = [MessagesService];
