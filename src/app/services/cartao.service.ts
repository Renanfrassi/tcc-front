import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Cartao } from "../models/cartao";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn : 'root',
})
export class CartaoService {
    private apiURL : String = environment.apiUrl;
    private endpoint = "/cartao";

    constructor(private _httpClient : HttpClient){ }

    deleteCartaoUsuario(idCartao : string, idUsuario : number) : Observable<Cartao[]>{
        return this._httpClient.delete<Cartao[]>(this.apiURL + this.endpoint + "?idCartao=" + idCartao + "&idUsuario=" + idUsuario);
    }


    gerarArquivoCartao() : Observable<any>{
        return this._httpClient.get<Cartao[]>(this.apiURL + this.endpoint + "/gerar-arquivo");
    }
}