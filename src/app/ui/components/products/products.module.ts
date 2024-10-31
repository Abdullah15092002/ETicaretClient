import { NgModule } from "@angular/core";
import { ProductsComponent } from "./products.component";
import { ListComponent } from "./list/list.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    ProductsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ProductsComponent }
    ])
  ],
})
export class ProductsModule { }
