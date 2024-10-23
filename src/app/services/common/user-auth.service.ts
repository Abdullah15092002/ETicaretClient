import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { Login_User } from '../../contracts/user/login_user';
import { TokenResponse } from '../../contracts/token/tokenResponse';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastr: CustomToastrService) { }

  async Loginuser(login_user: Login_User, callBackFunc?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }
      , login_user)
    const responseToken: TokenResponse = await firstValueFrom(observable) as TokenResponse

    if (responseToken) {

      localStorage.setItem("AccessToken", (responseToken.token.accessToken))
      localStorage.setItem("RefreshToken", (responseToken.token.refreshToken))


      this.toastr.message("Kullanıcı Girişi Başarıyla Gerçekleştirildi", "Başarılı",
        { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
    }
    callBackFunc();
  }

  async RefreshTokenLogin(refreshToken: string, callBackFunc?: (state) => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      action: "refreshTokenLogin",
      controller: "auth"
    }, { refreshToken: refreshToken });

    try {
      const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse

      if (tokenResponse) {

        localStorage.setItem("AccessToken", tokenResponse.token.accessToken)
        localStorage.setItem("RefreshToken", tokenResponse.token.refreshToken)
        
      }
      callBackFunc(tokenResponse ? true : false);
    } catch  {
      callBackFunc(false);
    }

  }
}
