import { Component, EventEmitter, Output } from '@angular/core';
import { Create_Product } from '../../../../contracts/create_product';
import { ProductsService } from '../../../../services/admin/model/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from '../../../../base/base.component';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent {

  constructor(private product_Service: ProductsService, spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner)
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    isAdminPage: true,
    explanation: "Resimleri Sürükleyin Veya Seçin",
    accept: ".png, .jpg, .jpeg"
  }
  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerTypes.BallAtom);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.product_Service.create(create_product, () => {
      this.hideSpinner(SpinnerTypes.BallAtom);
      this.alertify.message("Product Başarıyla Eklendi", { messageType: MessageType.Success, position: Position.TopCenter })
      this.createdProduct.emit(create_product);
    }, (errorMessage) => {
      this.alertify.message(errorMessage, { messageType: MessageType.Error, position: Position.TopRight });
    })
  }
}
