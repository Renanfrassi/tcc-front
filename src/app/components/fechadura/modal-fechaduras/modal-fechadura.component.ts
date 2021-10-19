import { Component, EventEmitter, Inject, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { Fechadura } from "../../../models/fechadura";
import { FechaduraService } from "../../../services/fechadura.service";

@Component({
    selector: 'app-fechadura',
    templateUrl: './modal-fechadura.component.html',
    styleUrls: ['./modal-fechadura.component.scss']
})

export class ModalFechaduraComponent implements OnInit {

    evento: EventEmitter<boolean> = new EventEmitter();

    fechadura: Fechadura;
    bsModalRef: BsModalRef;

    constructor(private _fechaduraService: FechaduraService,
                private _mdService: BsModalService) { }

    ngOnInit() {
    }

    postFechadura() {
        this._fechaduraService.postFechaduras(this.fechadura).subscribe(
            result => {
                this.evento.emit(true);
            },
            error => {
                this.evento.emit(true);
            }
        )
    }

}