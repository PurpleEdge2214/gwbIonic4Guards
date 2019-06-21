import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // only maintain the value in this class, nowhere else!
  private userAccessLevel = new BehaviorSubject(0);  

  public userDisplayName: string = '';

  private validUsers = ['Admin', 'Adam', 'Anne', 'Barbra', 'Brian']

  constructor(
  ) { }


  loginUser(user: string) {
    // logout existing user, if any, before attempting login
    this.resetUserAccess();

    // check if the name is in our list of valid users
    console.log('User name passed for login: ', user);
    console.log('Valid users: ', this.validUsers);

    return new Observable(observer => {
      setTimeout(() => {

        if (this.validUsers.indexOf(user) > -1) {
          this.userDisplayName = user;
          // resetting the BehaviourSubject will trigger the BehaviourSubject observer
          if (user === 'Admin') {
            this.userAccessLevel.next(4);
          } else {
            this.userAccessLevel.next(1);  // they are a logged in user
          }
        }

        console.log('loginUser return value: ', this.userAccessLevel.value);
        observer.next(this.userAccessLevel.value);
        observer.complete();
      }, 1000)
    })

  }

  getUserAccessLevelValue() {
    return this.userAccessLevel.value;  // return the value directly
  }

  getUserAccessLevelSubject() {
    return this.userAccessLevel;  // return the private observable so we can subscribe to it
  }

  resetUserAccess() {
    this.userAccessLevel.next(0);
    this.userDisplayName = '';
  }

}
