import { Component, Inject, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { Usuario } from "../../models/usuario";
import { UsuarioService } from "../../services/usuario.service";
import { ModalUsuarioComponent } from "./modal-usuarios/modal-usuario.component";

@Component({
    selector : 'app-usuario',
    templateUrl : './usuario.component.html',
    styleUrls : ['./usuario.component.scss'] 
})

export class UsuarioComponent implements OnInit{
    
    listaUsuario : Array<Usuario> = [];

    bsModalRef : BsModalRef;

    constructor(private _usuarioService : UsuarioService,
                private _modalService : BsModalService){ }

    ngOnInit(){
        this.getUsuarios();
     }

     getUsuarios(){
        this.listaUsuario = [];

         this._usuarioService.getUsuarios().subscribe(
             result => {
                this.listaUsuario = result;
             },
             erro => console.error(erro)
             
         )
     }

     abrirModalUsuario(usuario : Usuario){
        const initialState: ModalOptions = {
            initialState: {
                usuario : usuario,
                cartoes : usuario.cartoes
            },
            class : 'modal-lg',
          };

        this.bsModalRef = this._modalService.show(ModalUsuarioComponent, initialState);
        this.bsModalRef.content.evento.subscribe(
            result => {
                this.getUsuarios();
                this._modalService.hide();
            }
        )
     }

     abrirModalCriaUsuario(){
        const initialState: ModalOptions = {
            initialState: {
                usuario : {},
                cartoes : []
            },
            class : 'modal-lg',
          };

        this.bsModalRef = this._modalService.show(ModalUsuarioComponent, initialState);
        this.bsModalRef.content.evento.subscribe(
            result => {
                this.getUsuarios();
                this._modalService.hide();
            }
        )
     }
}