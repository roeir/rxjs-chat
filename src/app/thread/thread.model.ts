import { Message } from '../message/message.model';

export interface Thread {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage?: Message;
}
