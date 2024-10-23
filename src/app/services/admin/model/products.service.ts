import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { List_Product } from '../../../contracts/list_product';
import { PaginatorProduct } from '../../../contracts/paginator_product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClientService: HttpClientService) {

  }

  async delete(id: string): Promise<boolean> {
    const deleteObservable: Observable<boolean> = this.httpClientService.delete<boolean>({ controller: "products" }, id)
    var isdeleted = await firstValueFrom(deleteObservable)
    return isdeleted;
  }
  create(product: Create_Product, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {

    this.httpClientService.post({ controller: "products" }, product).subscribe(result => {
      succesCallBack();
    },
      (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;

        let message = "";
        _error.forEach((v) => {
          v.value.forEach((_v) => {
            message += `${_v}<br>`;
          })
        })
        errorCallBack(message);
      });
  }

  async read(page: number = 0, size: number = 3, succesCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void): Promise<PaginatorProduct> {

    const promiseData: Promise<PaginatorProduct> = lastValueFrom(this.httpClientService.get<PaginatorProduct>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }))
    promiseData.then(d => succesCallBack())
      .catch((httpErrorMessage: HttpErrorResponse) => errorCallBack(httpErrorMessage.message))
    return await promiseData;

  }



}
