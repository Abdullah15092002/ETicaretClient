import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../../services/common/basket.service';
import { ListBasketItem } from '../../../contracts/basket/list_basket_item';
import { BaseComponent, SpinnerTypes } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UpdateBasket } from '../../../contracts/basket/update_basket';

declare var $: any;
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent extends BaseComponent implements OnInit {

  constructor(private basketService: BasketService, spinner: NgxSpinnerService) {
    super(spinner)
  }
  async removeBasketItem(basketItemId: string) {
    this.showSpinner(SpinnerTypes.BallAtom)
    await this.basketService.remove(basketItemId)
    $("." + basketItemId).fadeOut(500, () => { this.hideSpinner(SpinnerTypes.BallAtom) });

  }
  async changeQuantity(object: any) {
    this.showSpinner(SpinnerTypes.BallAtom)
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const _basketItem: UpdateBasket = new UpdateBasket();
    _basketItem.basketItemId = basketItemId;
    _basketItem.quantity = quantity;
    await this.basketService.updateQuantity(_basketItem)
    this.hideSpinner(SpinnerTypes.BallAtom)
  }

  basketItems: ListBasketItem[];
  async ngOnInit() {

    this.basketItems = await this.basketService.get();

  }

}
