import { Component, Inject, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { Usuario } from "../../models/usuario";
import { UsuarioService } from "../../services/usuario.service";
import { ModalUsuarioComponent } from "./modal-usuarios/modal-usuario.component";
import * as moment from 'moment';
import { ToastService } from "src/app/services/toast.service";
import { ConfirmDialogService } from "src/app/services/confirm-dialog.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
    selector : 'app-usuario',
    templateUrl : './usuario.component.html',
    styleUrls : ['./usuario.component.scss'] 
})

export class UsuarioComponent implements OnInit{
    
    listaUsuario : Array<Usuario> = [];

    bsModalRef : BsModalRef;
    constructor(private _usuarioService : UsuarioService,
                private _modalService : BsModalService,
                private dialogModal : ConfirmDialogService,
                private toastService: ToastService,
                private loaderService : LoaderService){ }

    ngOnInit(){
        this.getUsuarios();
     }

     getUsuarios(){
        this.loaderService.show();
        this.listaUsuario = [];

         this._usuarioService.getUsuarios().subscribe(
             result => {
                this.listaUsuario = result;
                this.loaderService.hide();
        
             },
             erro => {
                this.dialogModal.confirm("Erro", erro, null, "sair", erro);
                this.loaderService.hide();
            }
             
         )
     }

     abrirModalUsuario(usuario : Usuario){
        const initialState: ModalOptions = {
            initialState: {
                usuario : usuario,
                cartoes : usuario.cartoes,
                state : 'V'
            },
            backdrop : 'static',
            keyboard: false,
            class : 'modal-lg',
          };

        this.bsModalRef = this._modalService.show(ModalUsuarioComponent, initialState);
        this.bsModalRef.content.evento.subscribe(
            result => {
                this.getUsuarios();
            }
        )
     }

     abrirModalCriaUsuario(){
        const initialState: ModalOptions = {
            initialState: {
                usuario : {},
                cartoes : [],
                state : 'I'
            },
            backdrop : 'static',
            keyboard: false,
            class : 'modal-lg',
          };

        this.bsModalRef = this._modalService.show(ModalUsuarioComponent, initialState);
        this.bsModalRef.content.evento.subscribe(
            result => {
                this.getUsuarios();
                this.toastService.showSuccess("Usuario salvo com sucesso!");
            }
        )
     }

     abrirModalUsuarioEdicao(usuario : Usuario){
        const initialState: ModalOptions = {
            initialState: {
                usuario : usuario,
                cartoes : usuario.cartoes,
                state : 'E'
            },
            backdrop : 'static',
            keyboard: false,
            class : 'modal-lg',
          };

        this.bsModalRef = this._modalService.show(ModalUsuarioComponent, initialState);
        this.bsModalRef.content.evento.subscribe(
            result => {
                this.getUsuarios();
                this.toastService.showSuccess("Usuario alterado com sucesso!");
                
            }
        )
     }

     confirmDeleteCartaoUsuario(usuario){
        this.dialogModal.confirm('Exclusão', 'Tem certeza que deseja deletar esse item?', 'Excluir', 'Cancelar').then(
            result => {
                if(result){
                    this.deleteCartaoUsuario(usuario);
                    return;
                }
            }
        )
     }

     deleteCartaoUsuario(usuario){
        this.loaderService.show();
        this._usuarioService.deleteUsuarios(usuario.id).subscribe(
            result => {
                this.listaUsuario = result;
                this.toastService.showSuccess('Usuario deletado com sucesso!');
                this.loaderService.hide();   

            },
            error => {
                this.dialogModal.confirm('Exclusão', error, null, 'Sair', 'error');
                this.loaderService.hide();   
            }
        );
     }
}