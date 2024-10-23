import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './user-auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from '../../base/base.component';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService extends BaseComponent implements HttpInterceptor {

  constructor(
    spinner: NgxSpinnerService,
    private toastr: CustomToastrService,
    private userAuthService: UserAuthService,
    private router: Router) { super(spinner) }




  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("a");
    return next.handle(req).pipe(catchError(error => {

      switch (error.status) {
        case HttpStatusCode.Unauthorized:


          this.userAuthService.RefreshTokenLogin(localStorage.getItem("RefreshToken"), (state) => {
            if (!state) {
              const url = this.router.url;
              if (url == "/products") {
                this.toastr.message("Sepete Ürün Eklemek İçin Giriş Yapmanız Gerekiyor", "Oturum Açınız", {
                  messageType: ToastrMessageType.Info,
                  position: ToastrPosition.TopRight
                })
                this.hideSpinner(SpinnerTypes.BallAtom)
              } else if (url == "/basket") {
                this.toastr.message("Sepetiniz Yok Lütfen Giriş Yapın", "Giriş Yapın", {
                  messageType: ToastrMessageType.Info,
                  position: ToastrPosition.TopRight
                })
                this.hideSpinner(SpinnerTypes.BallAtom)
              }

              else {
                this.toastr.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır", "Yetkisiz İşlem!", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.BottomFullWidth
                });
                this.hideSpinner(SpinnerTypes.BallAtom)
              }
            }
          }).then(data => { })
          break;
        case HttpStatusCode.InternalServerError:

          this.toastr.message("Sunucuya Erişilemiyor", "Sunucu Hatası!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth,
          })
          this.hideSpinner(SpinnerTypes.BallAtom)
          break;
        case HttpStatusCode.Unauthorized:
          this.toastr.message("Geçersiz istek yapıldı", "Geçersiz İstek!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          this.hideSpinner(SpinnerTypes.BallAtom)
          break;
        case HttpStatusCode:
          this.toastr.message("Geçersiz istek yapıldı", "Geçersiz İstek!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          this.hideSpinner(SpinnerTypes.BallAtom)
          break;
        /*default:
          this.toastr.message("Bilinmeyen Hata","Hata!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopRight
          })
        break;*/
      }

      return of(error);
    }))

  }
}
