import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { PerfilComponent } from '../perfil/perfil.component';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {
	msgs : Array<{assunto : String,
					 data : string,
				  destino : String,
				 mensagem : String,
				 origem   : String,
				   status : Boolean,
					  __v : Number,
					  _id : String}>;
  constructor(private autenticacao:AutenticacaoService,private router:Router) { }

  ngOnInit() {
  	let u = JSON.parse(localStorage.getItem('usuario'));

  	this.autenticacao.getMensagensRecebidas(u.login).subscribe(total => {
        this.msgs = total;
        for(let i=0;i<this.msgs.length;i++){
        	let aux = new Date(this.msgs[i].data);
        	this.msgs[i].data = aux.getDay() + "/" + aux.getMonth() + "/" + aux.getFullYear()+ " " + aux.getHours() + ":"+aux.getMinutes();
        }
    });


  }

}
