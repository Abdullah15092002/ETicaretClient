import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadDialogComponent } from './fileupload-dialog/fileupload-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    DeleteDialogComponent,
    ImageDialogComponent,

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule,
    MatCardModule,
    MatButtonModule,

  ]
})
export class DialogsModule { }
