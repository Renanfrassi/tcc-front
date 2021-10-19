import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Fechadura } from "../models/fechadura";

@Injectable({
    providedIn : 'root',
})
export class FechaduraService {

    constructor(private _httpClient : HttpClient){ }

    getFechaduras() : Observable<Array<Fechadura>> {
        return this._httpClient.get<Array<Fechadura>>("http://localhost:8080/fechadura");
    } 

    postFechaduras(fechadura : Fechadura) : Observable<Fechadura>{
        return this._httpClient.post<Fechadura>("http://localhost:8080/fechadura", fechadura);
    }

    putFechaduras(fechadura : Fechadura) : Observable<Fechadura>{
        return this._httpClient.put<Fechadura>("http://localhost:8080/fechadura", fechadura);
    }

    deleteFechaduras(id : string) : Observable<Fechadura>{
        return this._httpClient.delete<Fechadura>("http://localhost:8080/fechadura");
    }

}