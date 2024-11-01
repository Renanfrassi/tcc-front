import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../components/commons/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  confirm(
    title: string = 'Confirmação',
    message: string = 'Tem certeza que deseja continuar?',
    confirmText: string = 'Confirmar',
    cancelText: string = 'Cancelar',
    operation: string = 'info',
    subMessage?
  ): Promise<boolean> {
    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState: {
        title,
        message,
        confirmText,
        cancelText,
        operation,
        subMessage
      },
      backdrop : 'static',
      keyboard: false,
      class: 'modal-md' 
    });

    return new Promise((resolve) => {
      this.bsModalRef.onHide.subscribe(() => {
        const result = this.bsModalRef.content;  
        resolve(result);
      });
    });
  }
}
