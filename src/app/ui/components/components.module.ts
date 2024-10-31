import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { ProductsModule } from "./products/products.module";
import { HomeModule } from "./home/home.module";
import { BasketModule } from "./basket/basket.module";
import { RegisterModule } from "./register/register.module";
import { LoginModule } from "./login/login.module";
import { NgModule } from "@angular/core";





@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ProductsModule,
    HomeModule,
    BasketModule,
    RegisterModule,
    LoginModule

  ], exports: [
    HomeModule,
  ]
})
export class ComponentsModule { }
