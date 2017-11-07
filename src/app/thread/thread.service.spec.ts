import { map, values } from 'lodash';
import { v4 } from 'uuid/v4';

import { User } from '../user/user.model';
import { Thread } from './thread.model';
import { Message } from '../message/message.model';

import { MessagesService } from '../message/messages.service';
import { ThreadService } from './thread.service';

describe('Thread Service', () => {
  it('Should collect threads from messages', () => {
    const user1: User = {
      avatarSrc: '',
      id: v4(),
      name: 'Small Dragon',
    };

    const user2: User = {
      avatarSrc: '',
      id: v4(),
      name: 'Fluffy Kins',
    };

    const thread1: Thread = {
      avatarUrl: '',
      id: v4(),
      name: 'thread 1',
    };

    const thread2: Thread = {
      avatarUrl: '',
      id: v4(),
      name: 'thread 2',
    };

    const message1: Message = {
      author: user1,
      id: v4(),
      text: 'Im little Dragon',
      sendAt: new Date(),
      thread: thread1,
    };

    const message2: Message = {
      author: user2,
      id: v4(),
      text: 'Meow!',
      sendAt: new Date(),
      thread: thread1,
    };

    const message3: Message = {
      author: user1,
      id: v4(),
      text: 'Fly Fly Fly',
      sendAt: new Date(),
      thread: thread2,
    };

    const messageService = new MessagesService();
    const threadService = new ThreadService(messageService);

    threadService.thread$.subscribe(threadIdx => {
      const threads: Thread[] = values(threadIdx);
      const threadNames: string = map(threads, (t: Thread) =>
        t.name
      ).join(', ');
      console.log(`=> threads (${threads.length}): ${threadNames}`);
    });

    // order threads test
    threadService.orderedThread$.subscribe(
      (threads: Thread[]) => {
        // should be ordered by latest message
        console.log(threads);
      }
    );

    // current thread messages test
    threadService.setCurrentThread(thread2);
    threadService.currentThreadMessage$.subscribe(
      (messages: Message[]) => {
        console.log(messages);
      }
    );

    messageService.addMessage(message1);
    messageService.addMessage(message2);
    messageService.addMessage(message3);

  });
});
