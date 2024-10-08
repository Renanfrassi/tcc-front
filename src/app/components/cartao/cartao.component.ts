import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cartao } from '../../models/cartao'
import { CartaoService } from "src/app/services/cartao.service";
import { Usuario } from "src/app/models/usuario";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { ModalCartaoComponent } from "./modal-cartao/modal-cartao.component";
import { error } from "@angular/compiler/src/util";
import { ConfirmDialogService } from "src/app/services/confirm-dialog.service";
import { ToastService } from "src/app/services/toast.service";
import { LoaderService } from "src/app/services/loader.service";
@Component({
    selector: 'app-cartao',
    templateUrl: './cartao.component.html',
    styleUrls: ['./cartao.component.scss']
})

export class CartaoComponent implements OnInit {
    @Input() listaCartao: Array<Cartao>;
    @Input() idUsuario: number
    @Input() state: string;
    @Output() evento: EventEmitter<boolean> = new EventEmitter<boolean>();

    bsModalRef: BsModalRef;

    constructor(private _cartaoService: CartaoService,
        private _modalService: BsModalService,
        private dialogModal: ConfirmDialogService,
        private toastService: ToastService,
        private loaderService: LoaderService) { }

    ngOnInit() {


    }

    abrirModalCartao(row) {
        const initialState: ModalOptions = {
            initialState: {
                idCartao: row.id,
                idUsuario: this.idUsuario,
                state: 'V'
            },
            backdrop: 'static',
            keyboard: false,
            class: 'modal-md',
        };
        this.bsModalRef = this._modalService.show(ModalCartaoComponent, initialState);
        this.bsModalRef.content.evento.subscribe(
            result => {
                this.listaCartao.push(result)
            }
        )
    }


    abrirModalCriaCartao() {
        const initialState: ModalOptions = {
            initialState: {
                cartao: new Cartao(),
                idUsuario: this.idUsuario,
                state: 'I'
            },
            backdrop: 'static',
            keyboard: false,
            class: 'modal-md',
        };
        this.bsModalRef = this._modalService.show(ModalCartaoComponent, initialState);
        this.bsModalRef.content.evento.subscribe(
            result => {
                this.listaCartao.push(result);
                this.toastService.showSuccess("Cartão e suas Permissões salvas com sucesso!");
                this.evento.emit();
            }
        )
    }

    abrirModalCartaoEditar(row) {
        const initialState: ModalOptions = {
            initialState: {
                idCartao: row.id,
                idUsuario: this.idUsuario,
                state: 'E'
            },
            backdrop: 'static',
            keyboard: false,
            class: 'modal-md',
        };
        this.bsModalRef = this._modalService.show(ModalCartaoComponent, initialState);
        this.bsModalRef.content.evento.subscribe(
            result => {
                this.listaCartao.push(result);
                this.toastService.showSuccess("Cartão e suas Permissões alteradas com sucesso!");
                this.evento.emit();

            }
        )
    }

    deleteCartaoUsuario(cartao) {
        this.loaderService.show();
        this._cartaoService.deleteCartaoUsuario(cartao.id, this.idUsuario).subscribe(
            result => {
                this.listaCartao = result;
                this.toastService.showSuccess('Cartão e suas Permissões deletado com sucesso!');
                this.loaderService.hide();
                this.evento.emit();

            },
            error => {
                this.dialogModal.confirm('Error', error, null, 'Sair', 'erro');
                this.loaderService.hide();
            }

        );
    }

    confirmDeleteCartaoUsuario(cartao) {
        this.dialogModal.confirm('Exclusão', 'Tem certeza que deseja deletar esse item?', 'Excluir', 'Cancelar').then(
            result => {
                if (result) {
                    this.deleteCartaoUsuario(cartao);
                    return;
                }
            }
        )
    }

    returnIconStatus(status: boolean) {
        return status ? "fa-fw fas fa-check" : "fa-fw fas fa-times";
    }

    closeModal() {
        this._modalService.hide();
    }


}