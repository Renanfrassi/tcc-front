import { Component, EventEmitter, Inject, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { Cartao } from '../../../models/cartao';
import { CartaoService } from '../../../services/cartao.service';

@Component({
    selector : 'app-modal-cartao',
    templateUrl : './modal-cartao.component.html',
    styleUrls : ['./modal-cartao.component.scss'] 
})

export class ModalCartaoComponent implements OnInit{
    
    cartao : Cartao;
    bsModalRef : BsModalRef;

    evento : EventEmitter<Cartao> = new EventEmitter<Cartao>();

    constructor(private _cartaoService : CartaoService,
                private _mdService : BsModalService){ }

    ngOnInit(){
     }

     addCartaoUsuario(){
        this.evento.emit(this.cartao);
        this.cartao = new Cartao();
     }

}