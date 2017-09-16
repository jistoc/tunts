import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { AutenticacaoService } from '../services/autenticacao.service';
import 'rxjs/add/operator/map';

@Injectable()
export class MensagemCounterService {

	counter : String;
	msgs : any;

	constructor(private http:Http, private autenticacao: AutenticacaoService) { 
		this.getCounter();
	}

	getCounter(){
		let usuario = JSON.parse(localStorage.getItem('usuario')).login;
	    let headers = new Headers();
	    this.autenticacao.carregarToken();
	    headers.append('Authorization', this.autenticacao.authToken);
	    headers.append('Content-Type','application/json');
	    let end = 'http://localhost:3000/mensagem/'+usuario+'/1';
	    this.http.get(end,{headers: headers}).map(res => res.json()).subscribe(total => {
          this.counter = total;
        });
	}

	listarMensagens(){
    let u = JSON.parse(localStorage.getItem('usuario'));
    this.autenticacao.getMensagensRecebidas(u.login).subscribe(total => {
        this.msgs = total;
        for(let i=0;i<this.msgs.length;i++){
          let aux = new Date(this.msgs[i].data);
          this.msgs[i].data = this.msgs[i].data.substring(8,10)+
                              "/"+this.msgs[i].data.substring(5,7)+
                              "/"+this.msgs[i].data.substring(0,4)+
                              " "+this.msgs[i].data.substring(11,13)+
                              ":"+this.msgs[i].data.substring(14,16);
        }
    });
  }
}
