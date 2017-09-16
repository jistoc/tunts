import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { AutenticacaoService } from '../services/autenticacao.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AcessoItemService {

	itens : any;
	constructor(private http:Http, private autenticacao: AutenticacaoService) { }

	listarItens(){
	    let u = JSON.parse(localStorage.getItem('usuario'));
	    this.autenticacao.getItensAnunciante(u.login).subscribe(total => {
	        this.itens = total;
	        for(let i=0;i<this.itens.length;i++){
	          this.itens[i].valor_s = "R$ " + this.itens[i].valor;
	          switch(this.itens[i].unidade){
	          	case "u" : this.itens[i].unidade_s = 'Unitário'; break;
				case "t" : this.itens[i].unidade_s = 'Dezena'; break;
				case "d" : this.itens[i].unidade_s = 'Duzia'; break;
				case "c" : this.itens[i].unidade_s = 'Centena'; break;
				case "k" : this.itens[i].unidade_s = 'Kilo'; break;
				case "l" : this.itens[i].unidade_s = 'Litro'; break;
				case "h" : this.itens[i].unidade_s = 'Hora'; break;
				case "d" : this.itens[i].unidade_s = 'Dia'; break;
				case "n" : this.itens[i].unidade_s = 'Não se aplica'; break;
	          }
	          switch(this.itens[i].tipo){
	          	case "s" : this.itens[i].tipo_s = 'Serviço'; break;
				case "p" : this.itens[i].tipo_s = 'Produto'; break;
	          }
	        }
	    });
	}

	

}
