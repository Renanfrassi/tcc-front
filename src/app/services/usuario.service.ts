import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Usuario } from "../models/usuario"

@Injectable({
    providedIn : 'root',
})
export class UsuarioService {

    constructor(private _httpClient : HttpClient){ }

    getUsuarios() : Observable<Array<Usuario>> {
        return this._httpClient.get<Array<Usuario>>("http://localhost:8090/usuario");
    } 

    getUsuarioId(id : number) : Observable<Usuario> {
        return this._httpClient.get<Usuario>("http://localhost:8090/usuario/find?id=" + id);
    } 

    postUsuarios(usuario : Usuario) : Observable<Usuario>{
        return this._httpClient.post<Usuario>("http://localhost:8090/usuario", usuario);
    }

    putUsuarios(usuario : Usuario) : Observable<Usuario>{
        return this._httpClient.put<Usuario>("http://localhost:8090/usuario", usuario);
    }

    deleteUsuarios(id : number) : Observable<Usuario[]>{
        return this._httpClient.delete<Usuario[]>("http://localhost:8090/usuario?id=" + id);
    }

    postPermissaoUsuario(slot : any){
        return this._httpClient.post<any>("http://localhost:8090/usuario/slot", slot);
    }

    putPermissaoUsuario(slot : any){
        return this._httpClient.put<any>("http://localhost:8090/usuario/slot", slot);
    }

    getUsuarioSlot(filter : any){
        return this._httpClient.get<any>("http://localhost:8090/usuario/slot?idUsuario=" + filter.idUsuario + "&idCartao=" + filter.idCartao + "&idFechadura=" + filter.idFechadura);
    }

}