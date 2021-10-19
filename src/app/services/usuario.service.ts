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
        return this._httpClient.get<Array<Usuario>>("http://localhost:8080/usuario");
    } 

    postUsuarios(usuario : Usuario) : Observable<Usuario>{
        return this._httpClient.post<Usuario>("http://localhost:8080/usuario", usuario);
    }

    putUsuarios(usuario : Usuario) : Observable<Usuario>{
        return this._httpClient.put<Usuario>("http://localhost:8080/usuario", usuario);
    }

    deleteUsuarios(id : number) : Observable<Usuario>{
        return this._httpClient.delete<Usuario>("http://localhost:8080/usuario");
    }

}