import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadDialogComponent } from './fileupload-dialog/fileupload-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    FileuploadDialogComponent,
    DeleteDialogComponent,

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class DialogsModule { }
