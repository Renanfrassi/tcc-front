import { Component, EventEmitter, Inject, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { Usuario } from "../../../models/usuario";
import { UsuarioService } from "../../../services/usuario.service";

@Component({
    selector: 'app-usuario',
    templateUrl: './modal-usuario.component.html',
    styleUrls: ['./modal-usuario.component.scss']
})

export class ModalUsuarioComponent implements OnInit {

    evento: EventEmitter<boolean> = new EventEmitter();

    usuario: Usuario;
    bsModalRef: BsModalRef;

    constructor(private _usuarioService: UsuarioService,
        private _mdService: BsModalService) { }

    ngOnInit() {
    }

    postUsuario() {
        this._usuarioService.postUsuarios(this.usuario).subscribe(
            result => {
                this.evento.emit(true);
            },
            error => {
                this.evento.emit(true);
            }
        )
    }

}