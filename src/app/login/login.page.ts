import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  private nextPage: string;

  constructor(
    public formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    //this.loginService.resetUserAccess();      // logout existing user when page is accessed
    this.loginForm = this.formBuilder.group({
      displayName: ['', Validators.required],
    });

    this.nextPage = (this.route.snapshot.paramMap.get('nextPage') == null) ? '' : this.route.snapshot.paramMap.get('nextPage');
    console.log('nextPage: ', this.nextPage);

  }

  ngOnInit() {
  }


  onSignIn(user: any) {
    
    console.log('onSignIn: ', user["displayName"]);

    this.loginService.loginUser(user['displayName']);
    this.loginForm.reset();

    this.loginService.getUserAccessLevelSubject()
      .subscribe(res => {
        if (res != 0) {
          this.router.navigate([this.nextPage]);   // navigate to this page
        }
      })

  }

}
