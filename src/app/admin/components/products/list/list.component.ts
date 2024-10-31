import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { ProductsService } from '../../../../services/admin/model/products.service';
import { BaseComponent, SpinnerTypes } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType } from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { PaginatorProduct } from '../../../../contracts/paginator_product';
import { DialogService } from '../../../../services/common/dialog.service';
import { ImageDialogComponent, ImageDialogState } from '../../../../dialogs/image-dialog/image-dialog.component';
import { PaginatorProductt } from '../../../../contracts/Paginatorproductt';
import { ProductImagee } from '../../../../contracts/productimagee';

declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private productService: ProductsService,
    private dialogService: DialogService
  ) {
    super(spinner)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'edit', 'image', 'delete',];
  dataSource: MatTableDataSource<ProductImagee> = null;

  getImageDialog(id: string) {
    this.dialogService.openDialog({
      componentType: ImageDialogComponent,
      data: id,
      options: { height: "800px", width: "1400px" }
    })
  }
  async getProducts() {
    this.showSpinner(SpinnerTypes.BallAtom)
    const allProducts: PaginatorProductt = await this.productService.read(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 3,
      () => this.hideSpinner(SpinnerTypes.BallAtom),
      (errorMessage) => this.alertify.message(errorMessage, { messageType: MessageType.Error, dismissOthers: true }))
    this.dataSource = new MatTableDataSource<ProductImagee>(allProducts.products);
    this.paginator.length = allProducts.totalProductCount;
  }

  async pageChanged() {

    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();
  }

}
