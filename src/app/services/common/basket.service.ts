import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { ListBasketItem } from '../../contracts/basket/list_basket_item';
import { CreateBasketItem } from '../../contracts/basket/create_basket_item';
import { UpdateBasket } from '../../contracts/basket/update_basket';




@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService) { }

  async get(): Promise<ListBasketItem[]> {

    const observable: Observable<ListBasketItem[]> = this.httpClientService.get(
      { controller: "baskets" });

    return await firstValueFrom(observable);
  }

  async add(basketItem: CreateBasketItem): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post(
      { controller: "baskets" }, basketItem)
    await firstValueFrom(observable);
  }

  async updateQuantity(basketItem: UpdateBasket): Promise<void> {
    const observable: Observable<any> = this.httpClientService.put(
      { controller: "baskets" }, basketItem)
    await firstValueFrom(observable)
  }
  async remove(basketItemId: string): Promise<void> {
    const observable: Observable<any> = this.httpClientService.delete(
      { controller: "baskets" }, basketItemId)
    await firstValueFrom(observable)
  }


}

