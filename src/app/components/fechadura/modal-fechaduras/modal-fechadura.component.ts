import { Component, EventEmitter, Inject, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { Fechadura } from "../../../models/fechadura";
import { FechaduraService } from "../../../services/fechadura.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConfirmDialogService } from "src/app/services/confirm-dialog.service";
import { ToastService } from "src/app/services/toast.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
    selector: 'app-fechadura',
    templateUrl: './modal-fechadura.component.html',
    styleUrls: ['./modal-fechadura.component.scss']
})

export class ModalFechaduraComponent implements OnInit {

    evento: EventEmitter<boolean> = new EventEmitter();

    fechadura: Fechadura;
    bsModalRef: BsModalRef;
    fechaduraForm: FormGroup;
    state: string;

    constructor(private _fechaduraService: FechaduraService,
        private formBuilder: FormBuilder,
        private _mdService: BsModalService,
        private dialogModal: ConfirmDialogService,
        private toastService: ToastService,
        private loaderService: LoaderService) { }

    ngOnInit() {
        this.fechaduraForm = this.formBuilder.group({
            id: [null],
            descricao: [''],
            nome: ['']
        });

        if (this.state === 'V') {
            this.setFechaduraForm();
            this.fechaduraForm.disable();
        } else if (this.state === 'E') {
            this.setFechaduraForm();
        }

    }

    setFechaduraForm() {
        this.fechaduraForm.get('id').setValue(this.fechadura.id);
        this.fechaduraForm.get('nome').setValue(this.fechadura.nome);
        this.fechaduraForm.get('descricao').setValue(this.fechadura.descricao);
    }

    confirm() {
        this.dialogModal.confirm('Confirmação', 'Tem certeza que deseja continuar?', 'Confirmar', 'Cancelar').then(
            result => {
                if (result) {
                    this.postFechadura();
                    return;
                }
            }
        )
    }

    postFechadura() {
        this.loaderService.show();
        this._fechaduraService.postFechaduras(this.fechaduraForm.value).subscribe(
            result => {
                this.evento.emit(true);
                this.closeModal();
            },
            error => {
                this.loaderService.hide();
                this.dialogModal.confirm('Error', error, null, 'sair', 'erro');
            }
        )
    }

    closeModal() {
        this._mdService.hide();
    }
}