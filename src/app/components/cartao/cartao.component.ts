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
    @Input() usuario : Usuario;
    
    listaCartao : Array<Cartao> = new Array<Cartao>();
    
    bsModalRef : BsModalRef;
    
    constructor(private _cartaoService : CartaoService,
                private _modalService : BsModalService){ }

    ngOnInit(){

     }

     getCartao(){
        this._cartaoService.getCartaos().subscribe(
            result => {
                this.listaCartao = result
            },
            error => {console.error(error)}
        )
     }

     abrirModalCartao(){
        const initialState: ModalOptions = {
            initialState: {
                cartao : new Cartao()
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

}