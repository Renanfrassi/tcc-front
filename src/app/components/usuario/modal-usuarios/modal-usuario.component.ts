import { Component, EventEmitter, Inject, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { Usuario } from "../../../models/usuario";
import { UsuarioService } from "../../../services/usuario.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Cartao } from "src/app/models/cartao";

@Component({
    selector: 'app-usuario',
    templateUrl: './modal-usuario.component.html',
    styleUrls: ['./modal-usuario.component.scss']
})

export class ModalUsuarioComponent implements OnInit {

    evento: EventEmitter<boolean> = new EventEmitter();

    usuario: Usuario;
    usuarioForm: FormGroup;
    cartoes : Array<Cartao>;

    constructor(private _usuarioService: UsuarioService,
        private formBuilder: FormBuilder,
        private _mdService: BsModalService) { }

    ngOnInit() {
        this.usuarioForm = this.formBuilder.group({
            id : [''],
            nome: [''],
            telefone: [''],
            idade: [''],
            email: [''],
            dataNasc: [''],
            senha: [''],
            matricula: [''],
        });

        if (this.usuario) {
            this.getUsuarioId();
        }
    }

    setUsuarioForm(){
        this.usuarioForm.get('id').setValue(this.usuario.id);
        this.usuarioForm.get('nome').setValue(this.usuario.nome);
        this.usuarioForm.get('telefone').setValue(this.usuario.telefone);
        this.usuarioForm.get('idade').setValue(this.usuario.idade);
        this.usuarioForm.get('email').setValue(this.usuario.email);
        this.usuarioForm.get('dataNasc').setValue(this.usuario.dataNasc);
        this.usuarioForm.get('senha').setValue(this.usuario.senha);
        this.usuarioForm.get('matricula').setValue(this.usuario.matricula);
    }

    postUsuario() {
        this._usuarioService.postUsuarios(this.usuarioForm.value).subscribe(
            result => {
                this.usuarioForm.reset();
                this.evento.emit(true);
                this._mdService.hide();
            },
            error => {
                this.evento.emit(true);
            }
        )
    }

    putUsuario() {
        this._usuarioService.postUsuarios(this.usuarioForm.value).subscribe(
            result => {
                this.usuarioForm.reset();
                this.evento.emit(true);
                this._mdService.hide();
            },
            error => {
                this.evento.emit(true);
            }
        )
    }

    getUsuarioId(){

        this._usuarioService.getUsuarioId(this.usuario.id).subscribe(
            result => {
               this.usuario = result;
               this.setUsuarioForm();
            },
            erro => console.error(erro)
            
        )
     }


    closeModal() {
        this._mdService.hide();
    }

}