import { Component, EventEmitter, Inject, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { Usuario } from "../../../models/usuario";
import { UsuarioService } from "../../../services/usuario.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Cartao } from "src/app/models/cartao";
import * as moment from 'moment';
import { ConfirmDialogService } from "src/app/services/confirm-dialog.service";
import { ToastService } from "src/app/services/toast.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
    selector: 'app-usuario',
    templateUrl: './modal-usuario.component.html',
    styleUrls: ['./modal-usuario.component.scss']
})

export class ModalUsuarioComponent implements OnInit {

    evento: EventEmitter<boolean> = new EventEmitter();

    usuario: Usuario;
    usuarioForm: FormGroup;
    cartoes: Array<Cartao>;
    state: string;

    constructor(private _usuarioService: UsuarioService,
        private formBuilder: FormBuilder,
        private _mdService: BsModalService,
        private dialogModal: ConfirmDialogService,
        private toastService: ToastService,
        private loaderService: LoaderService) { }

    ngOnInit() {
        this.usuarioForm = this.formBuilder.group({
            id: [null],
            nome: [null],
            telefone: [''],
            idade: [''],
            email: [''],
            dataNasc: [''],
            matricula: [null],
        });

        if (this.state === 'V') {
            this.usuarioForm.disable();
            this.getUsuarioId();
        } else if (this.state === 'E') {
            this.getUsuarioId();
        }
    }

    setUsuarioForm() {
        this.usuarioForm.get('id').setValue(this.usuario.id);
        this.usuarioForm.get('nome').setValue(this.usuario.nome);
        this.usuarioForm.get('telefone').setValue(this.usuario.telefone);
        this.usuarioForm.get('idade').setValue(this.usuario.idade);
        this.usuarioForm.get('email').setValue(this.usuario.email);
        this.usuarioForm.get('dataNasc').setValue(moment(this.usuario.dataNasc).format('YYYY-MM-DD'));
        this.usuarioForm.get('matricula').setValue(this.usuario.matricula);
    }

    postUsuario() {
        this.loaderService.show();
        this._usuarioService.postUsuarios(this.usuarioForm.value).subscribe(
            result => {
                this.state = 'E';
                this.evento.emit(true);
                this.loaderService.hide();
                this.usuarioForm.setValue({
                    id: result.id,
                    nome: result.nome,
                    telefone: result.telefone,
                    idade: result.idade,
                    email: result.email,
                    dataNasc: moment(result.dataNasc).format('YYYY-MM-DD'),
                    matricula: result.matricula,
                })

            },
            error => {
                this.dialogModal.confirm('Error ao Incluir', error.error, null, 'sair', 'erro');
                this.loaderService.hide();

            }
        )
    }

    confirm() {
        this.dialogModal.confirm('Confirmação', 'Tem certeza que deseja continuar?', 'Confirmar', 'Cancelar', 'info').then(
            result => {
                if (result) {

                    if (this.state === 'I')
                        this.postUsuario();
                    else
                        this.putUsuario();

                    return;
                }
            }
        )
    }

    putUsuario() {
        this.loaderService.show();

        this._usuarioService.postUsuarios(this.usuarioForm.value).subscribe(
            result => {
                this.evento.emit(true);

            },
            error => {
                this.dialogModal.confirm('Error ao Alterar', error.error, null, 'Sair', 'erro');
                this.loaderService.hide();

            }

        )
    }

    getUsuarioId() {
        this.loaderService.show();
        this._usuarioService.getUsuarioId(this.usuario.id).subscribe(
            result => {
                this.usuario = result;
                this.setUsuarioForm();
                this.loaderService.hide();
            },
            error => {
                this.dialogModal.confirm('Error', error.error, null, 'sair', 'erro');
                this.loaderService.hide();
                this._mdService.hide();
            }

        )
    }

    closeModal() {
        this._mdService.hide();
    }

}