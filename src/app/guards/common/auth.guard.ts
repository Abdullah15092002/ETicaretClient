import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypes } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const toastr: CustomToastrService = inject(CustomToastrService);
  const spinner: NgxSpinnerService = inject(NgxSpinnerService)
  spinner.show(SpinnerTypes.BallAtom)
  if (!_isAuthenticated) {
    router.navigate(["login"], { queryParams: { returnUrl: state.url } })
    toastr.message("Yetkisiz Erişim", "Oturum Açmanız Gerekiyor", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.BottomRight
    })
  }
  spinner.hide(SpinnerTypes.BallAtom)

  return true;
};
