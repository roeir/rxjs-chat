import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Thread, ThreadService } from '../../thread';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css'],
})

export class ChatThreadComponent implements OnInit {
  @Input('thread') thread: Thread;
  selected = false;

  constructor(
    public threadService: ThreadService
  ) { }

  ngOnInit() {
    this.threadService.currentThread$
      .subscribe(
        (currentThread: Thread) => {
          this.selected = this.thread &&
            currentThread &&
            (currentThread.id === this.thread.id);
        }
      );
  }

  handleThreadSelect() {
    this.threadService.setCurrentThread(this.thread);
  }
}
