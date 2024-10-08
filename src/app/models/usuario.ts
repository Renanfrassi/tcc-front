import { Fechadura } from '../models/fechadura';
import { Cartao } from './cartao';

export class Usuario{
	id : number;
	nome : string;
	telefone : number;
	idade : number;
	email : string;
	dataNasc : Date;
	matricula : number;
	cartoes : Array<Cartao>;

}