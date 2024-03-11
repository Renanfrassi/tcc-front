import { Component, EventEmitter, Inject, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { Cartao } from '../../../models/cartao';
import { CartaoService } from '../../../services/cartao.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Fechadura } from "src/app/models/fechadura";
import { Slot } from "src/app/models/slot";

import { FechaduraService } from "src/app/services/fechadura.service";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
    selector : 'app-modal-cartao',
    templateUrl : './modal-cartao.component.html',
    styleUrls : ['./modal-cartao.component.scss'] 
})

export class ModalCartaoComponent implements OnInit{
    idUsuario : number
    listaSemanal : Array<any> = [];
    listaSlot : Array<Slot> = []
    cartao : Cartao;
    bsModalRef : BsModalRef;
    cartaoForm: FormGroup;

    fechaduras : Array<Fechadura> = [];

    horas: string[] = Array.from({ length: 24 }, (_, i) => (i < 10 ? '0' : '') + i + ':00');

    evento : EventEmitter<Cartao> = new EventEmitter<Cartao>();

    constructor(private _cartaoService : CartaoService,
                private _fechaduraService : FechaduraService,
                private formBuilder: FormBuilder,
                private _mdService : BsModalService,
                private _usuarioService : UsuarioService){ }

    ngOnInit(){
        this.getFechaduras()
        this.listaSemanal = [
            {diaSemana: 1, nomeDia: 'Domingo'},
            {diaSemana: 2, nomeDia: 'Segunda'},
            {diaSemana: 3, nomeDia: 'Terça'},
            {diaSemana: 4, nomeDia: 'Quarta'},
            {diaSemana: 5, nomeDia: 'Quinta'},
            {diaSemana: 6, nomeDia: 'Sexta'},
            {diaSemana: 7, nomeDia: 'Sábado'},
        ];

        this.cartaoForm = this.formBuilder.group({
            idCartao : [''],
            dataInicio : [''],
            dataFim : [''],
            idFechadura : [''],
            listaSlot : [],
            idUsuario : [''],
        });
     }

     addCartaoUsuario(){
        // this.evento.emit(this.cartao);
        // this.cartao = new Cartao();
        this.cartaoForm.get('listaSlot').setValue(this.listaSlot);
        this.cartaoForm.get('idUsuario').setValue(this.idUsuario);
        console.log(this.cartaoForm);

        this._usuarioService.postPermissaoUsuario(this.cartaoForm.value).subscribe();
     }

     getFechaduras(){
        this.fechaduras = [];

         this._fechaduraService.getFechaduras().subscribe(
             result => {
                this.fechaduras = result;   
             },
             erro => console.error(erro)
             
         )
     }

     addSlot(event){
        if(this.listaSlot.find(slot => slot.diaSemana == event.target.value)){

            let index = this.listaSlot.findIndex(item => item.diaSemana === event.target.value)
            this.listaSlot.splice(index, 1);

            return;
        }
        
        this.listaSlot.push({diaSemana : event.target.value, horaFim: '', horaInicio: ''});

     }

     changeHoraInicoSlot(dia, event){
        this.listaSlot = this.listaSlot.map(slot => {
            if(slot.diaSemana == dia){
                return {...slot, horaInicio : event.target.value}
            };
            return slot;
        });

     }

     changeHoraFimSlot(dia, event){
        this.listaSlot = this.listaSlot.map(slot => {
            if(slot.diaSemana == dia){
                return {...slot, horaFim : event.target.value}
            };
            return slot;
        });
     }

     isDisabledColunaHora(diaSemana : number){
        console.log(diaSemana);
        return this.listaSlot.find(slot => slot.diaSemana == diaSemana) ? false : true
     }

}