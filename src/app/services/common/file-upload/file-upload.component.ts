import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
import { FileuploadDialogComponent, FileUploadState } from '../../../dialogs/fileupload-dialog/fileupload-dialog.component';
import { ImageDialogComponent } from '../../../dialogs/image-dialog/image-dialog.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  constructor(
    private imageDialogComponent: ImageDialogComponent,
    private httpClientService: HttpClientService,
    private customToastrService: CustomToastrService,
    private alertifyService: AlertifyService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) { }
  public files: NgxFileDropEntry[];


  @Input() options: Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append("Files", _file, _file.name);
      })
    }

    this.dialogService.openDialog({
      options: { height: "250px", width: "250px" },
      componentType: FileuploadDialogComponent,
      data: FileUploadState.Yes,
      afterClosed: () => {
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe({

          next: () => {
            const succesmessage: string = "Dosyalar Başarı İle Yüklendi"
            this.imageDialogComponent.refreshImage();
            if (this.options.isAdminPage) {
              this.alertifyService.message(succesmessage, { messageType: MessageType.Success, position: Position.TopRight })
            }
            else {
              this.customToastrService.message(succesmessage, "Başarılı!", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
            }
          }, error: (err) => {
            console.log(err)
            const errormessage: string = "Dosyalar Yüklenirken Hata Oluştu"
            if (this.options.isAdminPage) {
              this.alertifyService.message(errormessage, { messageType: MessageType.Error, position: Position.TopRight })
            }
            else {
              this.customToastrService.message(errormessage, "Hata!", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight })
            }
          }
        })

      }


    })
  }

}
export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string
  accept?: string
  isAdminPage?: boolean
}




