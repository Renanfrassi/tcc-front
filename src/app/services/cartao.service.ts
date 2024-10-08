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

    deleteCartaoUsuario(idCartao : string, idUsuario : number) : Observable<Cartao[]>{
        return this._httpClient.delete<Cartao[]>("http://localhost:8090/cartao?idCartao=" + idCartao + "&idUsuario=" + idUsuario);
    }

}