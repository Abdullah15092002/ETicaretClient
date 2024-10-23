import { Component } from '@angular/core';


import { NgxSpinnerService, } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from '../../../base/base.component';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Login_User } from '../../../contracts/user/login_user';
import { UserAuthService } from '../../../services/common/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  constructor(private userAuthService: UserAuthService,
    spinner: NgxSpinnerService, private authService: AuthService,
    private activatedRoute: ActivatedRoute, private router: Router
  ) {
    super(spinner)
  }


  async Login(txtUsernameOrEmail: string, txtPassword: string) {
    this.showSpinner(SpinnerTypes.BallAtom)
    let user: Login_User = new Login_User();
    user.Password = txtPassword
    user.UsernameOrEmail = txtUsernameOrEmail

    await this.userAuthService.Loginuser(user, () => {
      this.authService.IdentityCheck();
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl) {
          this.router.navigate([returnUrl])
        }
      })
      this.hideSpinner(SpinnerTypes.BallAtom)
    });
  }
}
