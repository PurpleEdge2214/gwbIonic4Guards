import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userAccessLevel = new BehaviorSubject(0);  // only maintain the value in this class, nowhere else!
  public userDisplayName: string = '';

  private validUsers = ['Admin', 'Adam', 'Anne', 'Barbra', 'Brian']

  public nextPage: string = 'home'; // where to go after login

  constructor(
    private router: Router,
    private alertController: AlertController,
  ) { }

  loginUser(user: string) {

    // logout existing user, if any, before attempting login
    this.resetUserAccess();

    // check if the name is in our list of valid users
    console.log('User name passed for login: ', user);
    console.log('Valid users: ', this.validUsers);

    if (this.validUsers.indexOf(user) == -1) {
      this.showAlert('Invalid Name', 'Hint: Try Admin, Adam, Anne, Barbra or Brian');
      return;
    }

    if (user === 'Admin') {
      this.userAccessLevel.next(4);
    } else {
      this.userAccessLevel.next(1);  // they are a logged in user
    }

    this.userDisplayName = user;

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

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
