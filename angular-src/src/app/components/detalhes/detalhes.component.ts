import { Component, OnInit, ViewChild } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EventoService } from '../../services/evento.service';
import { ModalMensagemComponent } from '../modal-mensagem/modal-mensagem.component';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
	id_evento : String;
	evento : Object;
	usuario : String;


	@ViewChild(ModalMensagemComponent) modalMensagem: ModalComponent;

	  open(dest) {
	      var aux = this.usuario+"#"+dest;
	      this.modalMensagem.open(aux);
	  }

  	constructor(private router : Router, 
  			  private route : ActivatedRoute,
  			  private autenticacao : AutenticacaoService,
  			  private flashMessage : FlashMessagesService,
  			  private evtService : EventoService) { }

  	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			if (params['evento'] !== undefined) {
				this.id_evento = params['evento'];
				this.evtService.getEvento(this.id_evento).subscribe( data => {
					data.data = data.data.substring(8,10)+
				                  "/"+data.data.substring(5,7)+
				                  "/"+data.data.substring(0,4);
					this.evento = data;

				});
			}
		});
		this.autenticacao.getPerfil().subscribe(perfil => {
	      this.usuario = perfil.user.login;
	    });
  	}

  	remover(id){
  		this.evtService.unsetItemEvento(id,this.id_evento).subscribe(data => {
  			if(data.msg=="removido"){
  				this.flashMessage.show("Item removido!", {cssClass: 'alert-success', timeout: 5000});
  				this.ngOnInit();
  			}
  		})
  	}
  	alterarStatus(item,op){
  		this.evtService.alterarStatus(item,this.id_evento,op).subscribe(data => {
  			if(data.msg=="alterado"){
  				this.flashMessage.show("Item enviado para checagem, aguarde a resposta do anunciante!", {cssClass: 'alert-success', timeout: 5000});
  				this.ngOnInit();
  			}
  		})
  	}

}
