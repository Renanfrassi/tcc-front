import { Component, EventEmitter, Inject, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { Cartao } from '../../../models/cartao';
import { CartaoService } from '../../../services/cartao.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Fechadura } from "src/app/models/fechadura";
import { Slot } from "src/app/models/slot";
import * as moment from 'moment';

import { FechaduraService } from "src/app/services/fechadura.service";
import { UsuarioService } from "src/app/services/usuario.service";
import { ConfirmDialogService } from "src/app/services/confirm-dialog.service";
import { ToastService } from "src/app/services/toast.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
    selector: 'app-modal-cartao',
    templateUrl: './modal-cartao.component.html',
    styleUrls: ['./modal-cartao.component.scss']
})

export class ModalCartaoComponent implements OnInit {
    idUsuario: number
    idCartao: string;
    idFechadura: number;
    listaSemanal: Array<any> = [];
    listaSlot: Array<Slot> = []
    cartao: Cartao;
    bsModalRef: BsModalRef;
    cartaoForm: FormGroup;
    state: string;
    fechaduras: Array<Fechadura> = [];

    horasInicio: string[] = Array.from({ length: 24 }, (_, i) => (i < 10 ? '0' : '') + i + ':00');
    horasFim: string[] = Array.from({ length: 24 }, (_, i) => (i < 10 ? '0' : '') + i + ':00');

    evento: EventEmitter<Cartao> = new EventEmitter<Cartao>();

    constructor(private _cartaoService: CartaoService,
        private _fechaduraService: FechaduraService,
        private formBuilder: FormBuilder,
        private _mdService: BsModalService,
        private _usuarioService: UsuarioService,
        private dialogModal: ConfirmDialogService,
        private toastService: ToastService,
        private loaderService: LoaderService) { }

    async ngOnInit() {
        this.initListaSemanal();
        
        this.cartaoForm = this.formBuilder.group({
            idCartao: [null],
            dataInicio: [null],
            dataFim: [null],
            idFechadura: [''],
            listaSlot: [],
            idUsuario: [''],
            dia1: [''],
            dia2: [''],
            dia3: [''],
            dia4: [''],
            dia5: [''],
            dia6: [''],
            dia7: [''],

        });
        
        await this.getFechaduras();

        if (this.state === 'V') {
            this.cartaoForm.disable();
            this.getUsuarioSlot();
            this.cartaoForm.get('idFechadura').enable();
        } else if (this.state === 'E') {
            this.getUsuarioSlot();
            this.cartaoForm.get('idCartao').disable();

        }

    }

    initListaSemanal() {
        this.listaSemanal = [
            { diaSemana: 1, nomeDia: 'Domingo', horaInicio: '00:00', horaFim: '00:00' },
            { diaSemana: 2, nomeDia: 'Segunda', horaInicio: '00:00', horaFim: '00:00' },
            { diaSemana: 3, nomeDia: 'Terça', horaInicio: '00:00', horaFim: '00:00' },
            { diaSemana: 4, nomeDia: 'Quarta', horaInicio: '00:00', horaFim: '00:00' },
            { diaSemana: 5, nomeDia: 'Quinta', horaInicio: '00:00', horaFim: '00:00' },
            { diaSemana: 6, nomeDia: 'Sexta', horaInicio: '00:00', horaFim: '00:00' },
            { diaSemana: 7, nomeDia: 'Sábado', horaInicio: '00:00', horaFim: '00:00' },
        ];
 
    }

    confirm() {
        this.dialogModal.confirm('Confirmação', 'Tem certeza que deseja continuar?', 'Confirmar', 'Cancelar', 'info').then(
            result => {
                if (result) {

                    if (this.state === 'I')
                        this.postPermissaoUsuario();
                    else
                        this.putPermissaoUsuario();

                    return;
                }
            }
        )
    }

    postPermissaoUsuario() {
        this.loaderService.show();

        this.cartaoForm.get('listaSlot').setValue(this.listaSlot);
        this.cartaoForm.get('idUsuario').setValue(this.idUsuario);

        this._usuarioService.postPermissaoUsuario(this.cartaoForm.value).subscribe(
            result => {
                this.evento.emit(result);
                this.state = "E";
                this.loaderService.hide();

            },
            error => {
                this.dialogModal.confirm('Error', error.error, null, 'Sair', 'erro');
                this.loaderService.hide();

            }

        );
    }

    putPermissaoUsuario() {
        this.loaderService.show();

        this.cartaoForm.get('listaSlot').setValue(this.listaSlot);
        this.cartaoForm.get('idUsuario').setValue(this.idUsuario);

        this._usuarioService.putPermissaoUsuario(this.cartaoForm.getRawValue()).subscribe(
            result => {
                this.evento.emit(result);
                this.loaderService.hide();

            },
            error => {
                this.dialogModal.confirm('Error', error.error, null, 'Sair', 'erro');
                this.loaderService.hide();
            }

        );
    }

    getFechaduras() : Promise<boolean> {
        this.loaderService.show();

        this.fechaduras = [];
        return new Promise((resolve, error) => {
            this._fechaduraService.getFechaduras().subscribe(
                result => {
                    this.fechaduras = result;
                    this.idFechadura = this.fechaduras[0].id
                    this.cartaoForm.get('idFechadura').setValue(this.idFechadura);
                    resolve(true);
                    this.loaderService.hide();
                },
                error => {
                    this.dialogModal.confirm('Error', error.error, null, 'Sair', 'erro');
                    this.loaderService.hide();
                    error(false);
                }
    
    
            )
        }

        )

    }

    addSlot(event) {

        if (this.listaSlot.find(slot => slot.diaSemana == event.target.value)) {

            let index = this.listaSlot.findIndex(item => item.diaSemana == event.target.value)
            this.listaSlot.splice(index, 1);
            this.listaSemanal[event.target.value - 1].horaInicio = "00:00"
            this.listaSemanal[event.target.value - 1].horaFim = "00:00"

            return;
        }

        this.listaSlot.push({ diaSemana: event.target.value, horaFim: '', horaInicio: '' });
    }

    changeHoraInicoSlot(dia, event) {

        this.listaSlot = this.listaSlot.map(slot => {
            if (slot.diaSemana == dia) {
                return { ...slot, horaInicio: event.target.value }
            };
            return slot;
        });

    }

    changeHoraFimSlot(dia, event) {
        this.listaSlot = this.listaSlot.map(slot => {
            
            if (slot.diaSemana == dia) {
                return { ...slot, horaFim: event.target.value }
            };
            return slot;
        });

    }

    changeFechadura(event) {
        
        this.cartaoForm.get('idFechadura').setValue(event.target.value);
        this.idFechadura = this.cartaoForm.get('idFechadura').value;
        this.getUsuarioSlot();
    }

    isDisabledColunaHora(diaSemana: number) {
        return this.listaSlot.find(slot => slot.diaSemana == diaSemana) ? false : true
    }

    getUsuarioSlot() {
        this.loaderService.show();

        let filter = {
            idCartao: this.idCartao,
            idFechadura: this.idFechadura,
            idUsuario: this.idUsuario
        }

        this._usuarioService.getUsuarioSlot(filter).subscribe(
            result => {
                this.cartaoForm.setValue({
                    idCartao: result.idCartao,
                    dataInicio: moment(result.dataInicio).format('YYYY-MM-DD'),
                    dataFim: moment(result.dataFim).format('YYYY-MM-DD'),
                    idFechadura: this.idFechadura,
                    listaSlot: result.listaSlot,
                    idUsuario: this.idUsuario,
                    dia1: '',
                    dia2: '',
                    dia3: '',
                    dia4: '',
                    dia5: '',
                    dia6: '',
                    dia7: '',
                })

                this.initListaSemanal();

                this.setListasDiasHoras();
                this.loaderService.hide();
            },
            error => {
                this.dialogModal.confirm("Error", error.error, null, "sair", 'erro');
                this.loaderService.hide();
                this._mdService.hide();
            }
        );

    }

    setListasDiasHoras() {
        this.listaSlot = [];
        this.cartaoForm.get("listaSlot").value.forEach(slot => {

            this.cartaoForm.get("dia" + slot.diaSemana).setValue(slot.diaSemana);
            this.listaSemanal[slot.diaSemana - 1].horaInicio = slot.horaInicio
            this.listaSemanal[slot.diaSemana - 1].horaFim = slot.horaFim

            this.listaSlot.push({ diaSemana: slot.diaSemana, horaFim: slot.horaFim, horaInicio: slot.horaInicio });
        });
    }


    closeModal() {
        this._mdService.hide();
    }


}