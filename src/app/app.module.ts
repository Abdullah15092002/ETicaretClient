import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { DeleteDirective } from './directives/admin/delete.directive';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { BaseComponent } from './base/base.component';
import { LayoutModule } from './admin/layout/layout.module';




@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,



  ],
  imports: [
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {

        tokenGetter: () => {
          if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem('AccessToken');
          } else {
            return null;
          }
        },
        allowedDomains: ["localhost:44339"]
      }
    })
  ],
  providers: [
    { provide: "baseUrl", useValue: "https://localhost:44339/api", multi: true },

    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
