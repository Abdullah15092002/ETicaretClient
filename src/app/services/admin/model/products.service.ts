import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { PaginatorProduct } from '../../../contracts/paginator_product';
import { ProductImage } from '../../../contracts/productImage';
import { PaginatorProductt } from '../../../contracts/Paginatorproductt';

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
    errorCallBack?: (errorMessage: string) => void): Promise<PaginatorProductt> {

    const promiseData: Promise<PaginatorProductt> = lastValueFrom(this.httpClientService.get<PaginatorProductt>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }))
    promiseData.then(d => succesCallBack())
      .catch((httpErrorMessage: HttpErrorResponse) => errorCallBack(httpErrorMessage.message))
    return await promiseData;

  }
  async readImages(id: string): Promise<ProductImage[]> {
    const getObservable: Observable<ProductImage[]> = this.httpClientService.get<ProductImage[]>
      ({ action: "getProductImages", controller: "products", }, id)

    return await firstValueFrom(getObservable)
  }
  async deleteImage(productid: string, imageid: string) {
    const observable: Observable<any> = this.httpClientService.delete({
      action: "deleteProductImage",
      controller: "products",
      queryString: `id=${productid}`
    }, imageid)
    return await firstValueFrom(observable)
  }

}
