import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';

export interface Message {
  id: string;
  sendAt: Date;
  isRead: boolean;
  author: User;
  text: string;
  thread: Thread;
}
