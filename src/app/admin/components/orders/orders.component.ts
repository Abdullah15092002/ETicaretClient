import { Component } from '@angular/core';
import { HttpClientService } from '../../../services/common/http-client.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  constructor(private httpClientService:HttpClientService){

    httpClientService.get({
      controller:"baskets"
    }).subscribe(data=>{debugger;});
  }
 
}
