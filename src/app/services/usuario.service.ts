import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Usuario } from "../models/usuario"
import { environment } from "src/environments/environment";

@Injectable({
    providedIn : 'root',
})
export class UsuarioService {
    private apiURL : String = environment.apiUrl;
    private endpoint = "/usuario";

    constructor(private _httpClient : HttpClient){ }

    getUsuarios() : Observable<Array<Usuario>> {
        return this._httpClient.get<Array<Usuario>>(this.apiURL + this.endpoint);
    } 

    getUsuarioId(id : number) : Observable<Usuario> {
        return this._httpClient.get<Usuario>(this.apiURL + this.endpoint + "/find?id=" + id);
    } 

    postUsuarios(usuario : Usuario) : Observable<Usuario>{
        return this._httpClient.post<Usuario>(this.apiURL + this.endpoint, usuario);
    }

    putUsuarios(usuario : Usuario) : Observable<Usuario>{
        return this._httpClient.put<Usuario>(this.apiURL + this.endpoint, usuario);
    }

    deleteUsuarios(id : number) : Observable<Usuario[]>{
        return this._httpClient.delete<Usuario[]>(this.apiURL + this.endpoint + "?id=" + id);
    }

    postPermissaoUsuario(slot : any){
        return this._httpClient.post<any>(this.apiURL + this.endpoint + "/slot", slot);
    }

    putPermissaoUsuario(slot : any){
        return this._httpClient.put<any>(this.apiURL + this.endpoint + "/slot", slot);
    }

    getUsuarioSlot(filter : any){
        return this._httpClient.get<any>(this.apiURL + this.endpoint + "/slot?idUsuario=" + filter.idUsuario + "&idCartao=" + filter.idCartao + "&idFechadura=" + filter.idFechadura);
    }

}