import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';
import { ProductsService } from '../../services/admin/model/products.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyOptions, AlertifyService, MessageType } from '../../services/admin/alertify.service';

declare var $: any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {


  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    //private productService: ProductsService,
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    private alertify: AlertifyService
  ) {
    //Üzerinde çalıştığımız DOM nesnesine img etiketini vermek için

    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png")
    img.setAttribute("style", "cursor:pointer;")
    img.width = 15
    img.height = 15
    _renderer.appendChild(element.nativeElement, img);

    // element DOM nesnesinin referansını tutuyor element.nativeElement diyerek dom nesnesine erişiyoruz ve  oluşturduğumuz img etiketini eklemiş oluyoruz

    //td<appDelete<img src="../../../../../assets/delete.png" style="cursor: pointer;" width=15 height=15 ></td> aslında bunu yapmış olduk


  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @HostListener("click")
  onClick() {

    this.openDialog(() => {

      const td: HTMLTableCellElement = this.element.nativeElement;
      //   this.productService.delete(this.id).then(isdeleted => { console.log(isdeleted) });
      this.httpClientService.delete({ controller: this.controller }, this.id,).subscribe({
        next: () => {
          this.alertify.message("Ürün Başarı ile silindi", { messageType: MessageType.Success, })
          $(td.parentElement).fadeOut(1000, () => {
            if (this.callback) {
              this.callback.emit();
            } else {
              console.log("callback tanımlı değil")
            }
          })
        }
      })

    })
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Delete
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Delete) {
        afterClosed();
      }

    });

  }

}
