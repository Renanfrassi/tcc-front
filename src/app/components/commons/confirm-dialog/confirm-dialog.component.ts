import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {

    @Input() title: string = 'Confirmação';
    @Input() message: string = 'Tem certeza que deseja continuar?';
    @Input() confirmText: string = null;
    @Input() cancelText: string = null;
    @Input() operation: string = 'info';

    constructor(public bsModalRef: BsModalRef) { }

    confirm() {
        this.bsModalRef.hide();
        this.bsModalRef.content = true;
    }


    closeModal() {
        this.bsModalRef.hide();
        this.bsModalRef.content = false;

    }

    controlIconClass(){
        let iconClass = {
            "erro" : "fas fa-exclamation-triangle mr-3",
            "info" : "fas fa-question mr-3",
            "sucess" : "fas fa-check mr-3"
        }

        return iconClass[this.operation];
    }

    controlTextClass(){
        let textClass = {
            "erro" : "text-danger",
            "info" : "text-primary",
            "sucess" : "text-sucess"
        }

        return textClass[this.operation];
    }

}
