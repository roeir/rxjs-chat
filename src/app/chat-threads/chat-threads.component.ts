import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Thread, ThreadService } from '../thread';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ChatThreadsComponent implements OnInit {
  thread$: Observable<Thread[]>;

  constructor(
    public threadService: ThreadService
  ) { }

  ngOnInit() {
    this.thread$ = this.threadService.orderedThread$;
  }
}
