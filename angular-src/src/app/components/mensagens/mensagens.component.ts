import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { PerfilComponent } from '../perfil/perfil.component';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ModalLrmComponent } from '../modal-lrm/modal-lrm.component';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
declare var jQuery:any;
declare var $:any;

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




  @ViewChild(ModalLrmComponent) modalMensagem: ModalComponent;

  ler(id) {
      for(let i = 0; i<this.msgs.length;i++){
        if(this.msgs[i]._id==id){
          this.modalMensagem.open(this.msgs[i].origem+"#"+this.msgs[i].assunto+"#"+this.msgs[i].mensagem);
          continue;
        }
      }
  }

  constructor(private autenticacao:AutenticacaoService,
              private router:Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  	
    this.listarMensagens();

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

  remover(id){
    this.autenticacao.removerMensagem(id).subscribe(total => {
      if(total.mensagem == 'removido'){
        this.flashMessage.show("Mensagem apagada com sucesso!", {cssClass: 'alert-success', timeout: 5000});
        $("#tbodyid").empty();
        this.ngOnInit();
      } else {
        this.flashMessage.show("Falha ao apagar mensagem!", {cssClass: 'alert-danger', timeout: 5000});

      }
    });

  }

}
