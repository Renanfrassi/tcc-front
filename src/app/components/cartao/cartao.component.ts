import { Component, Inject, Input, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cartao } from '../../models/cartao'
import { CartaoService } from "src/app/services/cartao.service";
import { Usuario } from "src/app/models/usuario";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { ModalCartaoComponent } from "./modal-cartao/modal-cartao.component";
@Component({
    selector : 'app-cartao',
    templateUrl : './cartao.component.html',
    styleUrls : ['./cartao.component.scss']
})

export class CartaoComponent implements OnInit{
    @Input() listaCartao : Array<Cartao>;
    @Input() idUsuario : number
    bsModalRef : BsModalRef;
    
    constructor(private _cartaoService : CartaoService,
                private _modalService : BsModalService){ }

    ngOnInit(){

     }

     abrirModalCartao(){
        const initialState: ModalOptions = {
            initialState: {
                cartao : new Cartao(),
                idUsuario : this.idUsuario
            },
            class : 'modal-md',
          };
        this.bsModalRef = this._modalService.show(ModalCartaoComponent, initialState);
        this.bsModalRef.content.evento.subscribe(
            result => {
                this.listaCartao.push(result)
                console.log(this.listaCartao)
            },
            erro => console.error(erro)
        )
     }

     returnIconStatus(status : boolean){
        return status ? "fa-fw fas fa-check" : "fa-fw fas fa-times";
     }

}