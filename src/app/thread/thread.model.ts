import { Message } from '../message/message.model';

export interface Thread {
  id: string;
  lastMessage: Message;
  name: string;
  avatarUrl: string;
}
