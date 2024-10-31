import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { extend } from 'jquery';
import { BaseDialog } from '../base/base-dialog';
import { ProductsService } from '../../services/admin/model/products.service';
import { ProductImage } from '../../contracts/productImage';



@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent extends BaseDialog<DeleteDialogComponent> {

  constructor(
    dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteState

  ) {
    super(dialogRef)
  }

}
export enum DeleteState {
  Delete
}
