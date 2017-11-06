import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';

export interface Message {
  id: string;
  sendAt: Date;
  author: User;
  text: string;
  thread: Thread;
  isRead?: boolean;
}
