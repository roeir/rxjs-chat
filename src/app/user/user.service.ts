import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../user/user.model';

@Injectable()
export class UserService {
  currentUser = new BehaviorSubject<User>(null);

  constructor() { }

  setCurrentUser(user: User) {
    this.currentUser.next(user);
  }
}
