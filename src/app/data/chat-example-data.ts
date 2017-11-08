import * as moment from 'moment';
import { v4 } from 'uuid/v4';

import { Message, MessagesService } from '../message';
import { Thread, ThreadService } from '../thread';
import { User, UserService } from '../user';

const me: User = {
  name: 'Juliet',
  avatarSrc: 'assets/images/avatars/female-avatar-1.png',
  id: v4(),
};

const ladyCap: User = {
  name: 'Lady Capulet',
  avatarSrc: 'assets/images/avatars/female-avatar-2.png',
  id: v4(),
};

const echo: User = {
  name: 'Echo Bot',
  avatarSrc: 'assets/images/avatars/male-avatar-1.png',
  id: v4(),
};

const rev: User = {
  name: 'Reverce Bot',
  avatarSrc: 'assets/images/avatars/female-avatar-4.png',
  id: v4(),
};

const wait: User = {
  name: 'Wait Bot',
  avatarSrc: 'assets/images/avatars/male-avatar-2.png',
  id: v4(),
};

const thLadyCap: Thread = {
  id: v4(),
  name: ladyCap.name,
  avatarUrl: ladyCap.avatarSrc,
};

const thEcho: Thread = {
  id: v4(),
  name: echo.name,
  avatarUrl: echo.avatarSrc,
};

const thRev: Thread = {
  id: v4(),
  name: rev.name,
  avatarUrl: rev.avatarSrc,
};

const thWait: Thread = {
  id: v4(),
  name: wait.name,
  avatarUrl: wait.avatarSrc,
};

const initialMessages: Array<Message> = [
  {
    id: v4(),
    author: me,
    sendAt: moment().subtract(45, 'minutes').toDate(),
    text: 'Yet let me weep for such a feeling loss.',
    thread: thLadyCap,
  },
  {
    id: v4(),
    author: ladyCap,
    sendAt: moment().subtract(20, 'minutes').toDate(),
    text: 'So shall you feel the loss, but not the friend which you weep for.',
    thread: thLadyCap,
  },
  {
    id: v4(),
    author: echo,
    sendAt: moment().subtract(1, 'minutes').toDate(),
    text: `I\'ll echo whatever you send me`,
    thread: thEcho,
  },
  {
    id: v4(),
    author: rev,
    sendAt: moment().subtract(3, 'minutes').toDate(),
    text: `I\'ll reverse whatever you send me`,
    thread: thRev,
  },
  {
    id: v4(),
    author: wait,
    sendAt: moment().subtract(4, 'minutes').toDate(),
    text: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
    thread: thWait,
  },
];

export class ChatExampleData {
  static init(
    messageService: MessagesService,
    threadService: ThreadService,
    userService: UserService,
  ) {
    messageService.message$.subscribe(() => ({}));

    userService.setCurrentUser(me);

    initialMessages.forEach((message: Message) => {
      messageService.addMessage(message);
    });

    threadService.setCurrentThread(thEcho);
  }

  static setupBots(messageService: MessagesService) {

    // echo bot
    messageService.messagesForThreadUser(thEcho, echo)
      .map((message: Message) => {
        messageService.addMessage({
          id: v4(),
          author: echo,
          text: message.text,
          thread: thEcho,
          sendAt: new Date(),
        });
      });

    // reverse bot
    messageService.messagesForThreadUser(thRev, rev)
      .map((message: Message) => {
        messageService.addMessage({
          id: v4(),
          author: echo,
          text: message.text.split('').reverse().join(''),
          thread: thRev,
          sendAt: new Date(),
        });
      });

    // waiting bot
    messageService.messagesForThreadUser(thWait, wait)
      .map((message: Message) => {
        let waitTime = parseInt(message.text, 10);
        let reply: string;

        if (isNaN(waitTime)) {
          waitTime = 0;
          reply = `I didn\'t understand ${message.text}. Try sending me a number`;
        } else {
          reply = `I waited ${waitTime} seconds to send you this.`;
        }

        const timeout = setTimeout(() => {
          messageService.addMessage({
            id: v4(),
            author: wait,
            text: reply,
            thread: thWait,
            sendAt: new Date(),
          });
          clearTimeout(timeout);
        }, waitTime * 1000);
      });
  }
}
