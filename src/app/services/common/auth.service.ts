import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastr: CustomToastrService

  ) { }

  IdentityCheck() {

    const token: string = localStorage.getItem("AccessToken");

    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true
    }
    _isAuthenticated = token != null && !expired;
  }
  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
  signOut() {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
    this.IdentityCheck();
    this.router.navigate([""])
    this.toastr.message("Oturumunuz Sonlandırıldı", "!", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.BottomRight
    })


  }
  ngOnInit(): void {

  }
}
export let _isAuthenticated: boolean;
