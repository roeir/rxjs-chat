import { v4 } from 'uuid';

import { MessagesService } from './messages.service';

import { Message } from './message.model';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';

describe('Message Service', () => {
  it('should test', () => {
    const user: User = {
      id: v4(),
      name: 'John',
      avatarSrc: '',
    };

    const thread: Thread = {
      id: v4(),
      name: 'John thread',
      avatarUrl: '',
    };

    const message1: Message = {
      id: v4(),
      author: user,
      sendAt: new Date(),
      text: 'hi',
      thread: thread,
      isRead: false,
    };

    const message2: Message = {
      id: v4(),
      author: user,
      sendAt: new Date(),
      text: 'Bye',
      thread: thread,
      isRead: false,
    };

    const messageService = new MessagesService();

    messageService.newMessage$.subscribe(
      (newMessage: Message) => {
        console.log('=> new messages', newMessage.text);
      }
    );

    messageService.message$.subscribe(
      (messages: Message[]) => {
        console.log('=> messages length', messages.length);
      }
    );

    messageService.addMessage(message1);
    messageService.addMessage(message2);

  });
});
