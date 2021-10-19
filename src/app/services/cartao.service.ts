import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Cartao } from "../models/cartao";

@Injectable({
    providedIn : 'root',
})
export class CartaoService {

    constructor(private _httpClient : HttpClient){ }

    getCartaos() : Observable<Array<Cartao>> {
        return this._httpClient.get<Array<Cartao>>("");
    } 

    postCartaos(cartao : Cartao) : Observable<Cartao>{
        return this._httpClient.post<Cartao>("", cartao);
    }

    putCartaos(cartao : Cartao) : Observable<Cartao>{
        return this._httpClient.put<Cartao>("", cartao);
    }

    deleteCartaos(id : string) : Observable<Cartao>{
        return this._httpClient.delete<Cartao>("");
    }

}