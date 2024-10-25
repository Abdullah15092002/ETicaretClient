import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { authGuard } from './guards/common/auth.guard';
import { ProductsComponent } from './admin/components/products/products.component';
import { CreateComponent } from './admin/components/products/create/create.component';

const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent, canActivate: [authGuard] },
      { path: "customers", loadChildren: () => import("./admin/components/customers/customers.module").then(module => module.CustomersModule), canActivate: [authGuard] },
      { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule), canActivate: [authGuard] },
      { path: "orders", loadChildren: () => import("./admin/components/orders/orders.module").then(module => module.OrdersModule), canActivate: [authGuard] },
    ], canActivate: [authGuard]
  },
  { path: "", component: HomeComponent },
  { path: "basket", loadChildren: () => import("./ui/components/basket/basket.module").then(module => module.BasketModule) },
  { path: "products", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule) },
  { path: "products/:pageNo", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule) },
  { path: "register", loadChildren: () => import("./ui/components/register/register.module").then(module => module.RegisterModule) },
  { path: "login", loadChildren: () => import("./ui/components/login/login.module").then(module => module.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
