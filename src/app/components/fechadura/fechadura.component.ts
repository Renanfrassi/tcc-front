import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Fechadura } from "src/app/models/fechadura";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { UsuarioService } from "src/app/services/usuario.service";
import { FechaduraService } from "src/app/services/fechadura.service";
import { ModalFechaduraComponent } from "./modal-fechaduras/modal-fechadura.component";
import { FormGroup } from "@angular/forms";
import { ConfirmDialogService } from "src/app/services/confirm-dialog.service";
import { ToastService } from "src/app/services/toast.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
    selector : 'app-fechadura',
    templateUrl : './fechadura.component.html',
    styleUrls : ['./fechadura.component.scss']
})

export class FechaduraComponent implements OnInit{
    
    listaFechadura : Array<Fechadura> = new Array();

    bsModalRef : BsModalRef;

    constructor(private _fechaduraService : FechaduraService,
                private _modalService : BsModalService,
                private dialogModal : ConfirmDialogService,
                private toastService: ToastService,
                private loaderService : LoaderService){ }

    ngOnInit(){
        this.getFechaduras();
     }

     getFechaduras(){
         this.loaderService.show();
        this.listaFechadura = [];

         this._fechaduraService.getFechaduras().subscribe(
             result => {
                this.listaFechadura = result;
                this.loaderService.hide();
             },
             error => {
                this.toastService.showInfo("Nenhuma fechadura registrada!");
                this.loaderService.hide();
                console.error(error);
            }
             
         )
     }

     abrirModalFechadura(fechadura){
        const initialState: ModalOptions = {
            initialState: {
                fechadura : fechadura,
                state: 'V'
            },
            backdrop : 'static',
            keyboard: false
          };

        this.bsModalRef = this._modalService.show(ModalFechaduraComponent, initialState);
        this._modalService._hideBackdrop
        this.bsModalRef.content.evento.subscribe(
            result => {
                this.getFechaduras();
            }
        )
     }

     abrirModalFechaduraInsercao(){
        const initialState: ModalOptions = {
            initialState: {
                fechadura : new Fechadura(),
                state: 'I',
            },
            backdrop : 'static',
            keyboard: false
          };

        this.bsModalRef = this._modalService.show(ModalFechaduraComponent, initialState);
        this.bsModalRef.content.evento.subscribe(
            result => {
                this.getFechaduras();
                this.toastService.showSuccess('Fechadura inserida com sucesso!!', 3000)

            }
        )
     }

     abrirModalFechaduraEdicao(fechadura){
        const initialState: ModalOptions = {
            initialState: {
                fechadura : fechadura,
                state: 'E'
            },
            backdrop : 'static',
            keyboard: false
          };

        this.bsModalRef = this._modalService.show(ModalFechaduraComponent, initialState);
        this.bsModalRef.content.evento.subscribe(
            () => {
                this.getFechaduras();
                this.toastService.showSuccess('Fechadura alterada com sucesso!!', 3000)

            }
        )
     }

     confirmDeleteFechaduraById(fechadura){
        this.dialogModal.confirm('Exclusão', 'Tem certeza que deseja deletar esse item?', 'Excluir', 'Cancelar', 'erro').then(
            result => {
                if(result){
                    this.deleteFechaduraById(fechadura);
                    return
                }
            }
        )
     }

     deleteFechaduraById(fechadura){
        this._fechaduraService.deleteFechaduras(fechadura.id).subscribe(
            () =>  {
                this.toastService.showSuccess('Fechadura deletada com sucesso!', 3000);
                this.getFechaduras();
            },
            error => {
                this.dialogModal.confirm('Ocorreu um erro!', error, null, 'Ok', 'erro')
                this.loaderService.hide();
            }
        );
     }

}