import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MensagemCounterService } from '../../services/mensagem-counter.service';

@Component({
  selector: 'app-modal-mensagem',
  templateUrl: './modal-mensagem.component.html',
  styleUrls: ['./modal-mensagem.component.css']
})

export class ModalMensagemComponent implements OnInit {

  destino : String;
  origem : String;
  assunto : String;
  mensagem : String;
  
  @ViewChild('modal')
    modal: ModalComponent;
    open(anunciante){
        var aux = anunciante.split("#");
        this.modal.open();
        this.destino = aux[1];
        this.origem = aux[0];
    }
    

    reset(){
      this.destino = "";
      this.assunto = "";
      this.mensagem = "";
    }

    enviarMensagem(){
      let mensagem = {
        destino : this.destino,
        origem : this.origem,
        assunto : this.assunto,
        mensagem : this.mensagem

      }

      this.autenticacao.setMensagem(mensagem).subscribe(data => {
        if(data.mensagem=="enviada"){
          this.origem = "";
          this.assunto = "";
          this.mensagem = "";
          this.flashMessage.show("Mensagem enviada com sucesso!", {cssClass: 'alert-success', timeout: 5000});
          this.msgCounter.listarMensagens();
          this.msgCounter.getCounter();
        } else {
          this.flashMessage.show("Falha ao enviar mensagem!", {cssClass: 'alert-danger', timeout: 5000});

        }
      });
      this.modal.close();
    }
  constructor(private flashMessage : FlashMessagesService, 
              private autenticacao : AutenticacaoService,
              private msgCounter : MensagemCounterService ) { }

  ngOnInit() {

  }

}
