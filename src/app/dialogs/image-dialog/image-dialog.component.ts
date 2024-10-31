import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductsService } from '../../services/admin/model/products.service';
import { ProductImage } from '../../contracts/productImage';
import { AlertifyOptions, AlertifyService, MessageType } from '../../services/admin/alertify.service';
import { DialogService } from '../../services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
declare var { $ }: any

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrl: './image-dialog.component.scss'
})
export class ImageDialogComponent extends BaseDialog<ImageDialogComponent> implements OnInit {
  constructor(
    private dialogService: DialogService,
    private productService: ProductsService,
    dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageDialogState | string
  ) { super(dialogRef) }


  @Output() options: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    isAdminPage: true,
    explanation: "Resimleri yükleyin",
    accept: ".png, .jpg, .jpeg",
    queryString: `id=${this.data}`

  }

  async deleteImage(imageid: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent, data: DeleteState.Delete, afterClosed: async () => {
        await this.productService.deleteImage(this.data as string, imageid)
        var card = $(event.srcElement).parent().parent().parent();
        card.fadeOut(500);
      },
    })

  }
  images: ProductImage[]
  async refreshImage() {
    this.images = await this.productService.readImages(this.data as string)
  }
  async ngOnInit() {
    this.refreshImage();
  }

}

export enum ImageDialogState {
  Yes
}
