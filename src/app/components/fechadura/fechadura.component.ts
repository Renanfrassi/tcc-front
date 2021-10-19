import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Fechadura } from "src/app/models/fechadura";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { UsuarioService } from "src/app/services/usuario.service";
import { FechaduraService } from "src/app/services/fechadura.service";
import { ModalFechaduraComponent } from "./modal-fechaduras/modal-fechadura.component";

@Component({
    selector : 'app-fechadura',
    templateUrl : './fechadura.component.html',
    styleUrls : ['./fechadura.component.scss']
})

export class FechaduraComponent implements OnInit{
    
    listaFechadura : Array<Fechadura> = new Array();

    bsModalRef : BsModalRef;

    constructor(private _fechaduraService : FechaduraService,
                private _modalService : BsModalService){ }

    ngOnInit(){
        this.getFechaduras();
     }

     getFechaduras(){
        this.listaFechadura = [];

         this._fechaduraService.getFechaduras().subscribe(
             result => {
                this.listaFechadura = result;
             },
             erro => console.error(erro)
             
         )
     }

     abrirModalFechadura(){
        const initialState: ModalOptions = {
            initialState: {
                fechadura : new Fechadura()
            }
          };

        this.bsModalRef = this._modalService.show(ModalFechaduraComponent, initialState);
        this.bsModalRef.content.evento.subscribe(
            result => {
                this.getFechaduras();
            }
        )
     }

}