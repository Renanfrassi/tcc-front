import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Fechadura } from "../models/fechadura";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn : 'root',
})
export class FechaduraService {
    private apiURL : String = environment.apiUrl;
    private endpoint = "/fechadura";

    constructor(private _httpClient : HttpClient){ }

    getFechaduras() : Observable<Array<Fechadura>> {
        return this._httpClient.get<Array<Fechadura>>(this.apiURL + this.endpoint);
    } 

    postFechaduras(fechadura : Fechadura) : Observable<Fechadura>{
        return this._httpClient.post<Fechadura>(this.apiURL + this.endpoint, fechadura);
    }

    putFechaduras(fechadura : Fechadura) : Observable<Fechadura>{
        return this._httpClient.put<Fechadura>(this.apiURL + this.endpoint, fechadura);
    }

    deleteFechaduras(id : string) : Observable<Fechadura>{
        return this._httpClient.delete<Fechadura>(this.apiURL + this.endpoint + "?idFechadura=" + id);
    }

}