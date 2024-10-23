import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientService } from '../../../services/common/http-client.service';
import { ProductsService } from '../../../services/admin/model/products.service';
import { Create_Product } from '../../../contracts/create_product';
import { ListComponent } from './list/list.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent implements OnInit{
  @ViewChild(ListComponent) listcomponent:ListComponent
constructor(private productService:ProductsService){}

 ngOnInit(): void {
  
 }
 
createdProduct(createdProduct:Create_Product){
  this.listcomponent.getProducts();
}
}




