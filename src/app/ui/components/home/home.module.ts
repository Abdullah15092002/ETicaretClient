import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    
    CommonModule,
    RouterModule.forChild([
      {path:"",component:HomeComponent}
    ]),
    MatButtonModule, MatMenuModule, MatIconModule
  ],exports:[
    HomeComponent
  ]
})
export class HomeModule { }
