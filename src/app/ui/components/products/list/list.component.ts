import { AfterContentChecked, Component, DoCheck, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/admin/model/products.service';
import { List_Product } from '../../../../contracts/list_product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginatorProduct } from '../../../../contracts/paginator_product';
import { BasketService } from '../../../../services/common/basket.service';
import { CreateBasketItem } from '../../../../contracts/basket/create_basket_item';
import { BaseComponent, SpinnerTypes } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    spinner: NgxSpinnerService, private toastr: CustomToastrService) {
    super(spinner)
  }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 6;
  pageList: number[] = [];
  products: List_Product[];



  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);

      try {
        const data: { totalProductCount: number, products: List_Product[] } =
          await this.productService.read(this.currentPageNo - 1, this.pageSize,
            () => { console.log('Products fetched successfully'); },
            (errorMessage: string) => { console.error('Error fetching products:', errorMessage); });


        this.products = data.products;
        this.totalProductCount = data.totalProductCount
        this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize)

        this.pageList = [];
        if (this.currentPageNo - 3 <= 0) {
          for (let i = 1; i <= 7; i++) {
            this.pageList.push(i);

          }
        }
        else if (this.currentPageNo + 3 >= this.totalPageCount) {
          for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++) {
            this.pageList.push(i)
          }
        }
        else {
          for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
            this.pageList.push(i);

          }
        }

      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    });
  }


  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerTypes.BallAtom)
    let _basketItem: CreateBasketItem = new CreateBasketItem();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem)
    this.hideSpinner(SpinnerTypes.BallScaleMultiple)
    this.toastr.message("Ürün Sepete Eklendi", "SepetGüncellendi", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
  }
}







