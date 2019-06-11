import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAccessService implements CanActivate {

  public nextPage: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertController: AlertController,
  ) { }

  canActivate(ars: ActivatedRouteSnapshot, rss: RouterStateSnapshot): boolean {
    console.log(ars);
    console.log(rss);

    console.log('Current Access Level: ', this.loginService.getUserAccessLevelValue());
    console.log('Access Level needed: ', ars.data.accessLevel);

    // restrict user access-------------------------------------------------------------
    let canProceed = this.loginService.getUserAccessLevelValue() >= ars.data.accessLevel;
    if (canProceed == false) {
      if (ars.data.accessLevel == 4) {
        this.showAlert('Access Denied', 'You must be an Administrator to view this page');
      } else {
        this.showAlert('Please Login', 'You must be logged in to view this page');
      }
      this.router.navigate(['/login', {'nextPage': rss.url}]);        // go to the login page, passing the next page to go to
      console.log('Page to go to after login successful: ', rss.url);
      return false;
    }

    // restrict date access-------------------------------------------------------------
    // we pass an array of day numbers - 0 = Sunday. 1-5 = weekdays, 6 = Saturday
    let scheduled = (ars.data.scheduled != undefined) ? ars.data.scheduled : [];
    if (scheduled.length > 0) {
      let dayToday = new Date().getDay();
      console.log("Today's numeric value is: ", dayToday);
      if (scheduled.indexOf(dayToday) == -1) {
        this.showAlert('Page Not Available', 'This page is only available on these days ' + scheduled.toString() + '. Today is ' + dayToday.toString());
        this.router.navigate(['']);        // go to the home page
        return false;
      }
    }

    return true;    // It is OK to proceed
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
