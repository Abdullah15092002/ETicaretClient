import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) {


  }

  openDialog(dialogParameters: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {

      width: dialogParameters.options?.width,
      height: dialogParameters.options?.height,
      data: dialogParameters?.data,
      position: dialogParameters.options?.position

    })

    dialogRef.afterClosed().subscribe(result => {

      if (result == dialogParameters.data) {

        dialogParameters.afterClosed()
      }

    });

  }
}
export class DialogParameters {
  componentType: ComponentType<any>;
  data: any;
  afterClosed: () => void;
  options: Partial<DialogOptions> = new DialogOptions();
}
export class DialogOptions {
  width: string;
  height: string;
  position?: DialogPosition;
}