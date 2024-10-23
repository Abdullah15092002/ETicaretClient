import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainbarComponent } from './mainbar/mainbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout.component';



@NgModule({
  declarations: [
    MainbarComponent,
    SidebarComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
