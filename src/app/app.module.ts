import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MessagesService } from './message';
import { ThreadService } from './thread';
import { UserService } from './user';

import { AppComponent } from './app.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatNavComponent } from './chat-nav/chat-nav.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatThreadsComponent, ChatThreadComponent } from './chat-threads';

import { FromNowPipe } from './pipes/from-now.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatPageComponent,
    ChatMessageComponent,
    ChatThreadComponent,
    ChatThreadsComponent,
    ChatNavComponent,
    ChatWindowComponent,
    FromNowPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    MessagesService,
    ThreadService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
