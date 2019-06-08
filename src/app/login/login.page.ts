import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private user: string;
  private sub: any;
  public loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {

    //this.loginService.resetUserAccess();      // logout existing user when page is accessed
    this.loginForm = this.formBuilder.group({
      displayName: ['', Validators.required],
    });

  }

  ngOnInit() {
  }


  onSignIn(user: any) {
    
    console.log('onSignIn: ', user["displayName"]);

    this.loginService.loginUser(user['displayName']);
    this.loginForm.reset();

    this.loginService.getUserAccessLevel()
      .subscribe(res => {
        if (res != 0) {
          this.router.navigate([this.loginService.nextPage]);   // navigate to this page
          this.loginService.nextPage = 'home';                  // reset the next page after login back to home
        }
      })

  }

}
