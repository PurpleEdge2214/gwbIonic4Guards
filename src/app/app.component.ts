import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public isAdmin: boolean;
  public userDisplayName: string;
  public hideLogout: boolean = true;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Admin Only',
      url: '/adminonly',
      icon: 'sad',
      adminOnly: true
    },
    {
      title: 'Weekdays Only',
      url: '/scheduled',
      icon: 'calendar'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.initializeApp();
    this.loginService.getUserAccessLevel()
      .subscribe((res) => {
        console.log('appComponent - userAccessLevel = ', res);
        this.isAdmin = (res == 4) ? true : false;
        this.hideLogout = (res == 0) ? true : false;
        this.userDisplayName = this.loginService.userDisplayName;
      })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.loginService.resetUserAccess();
    this.router.navigate(['home']);
  }
}
