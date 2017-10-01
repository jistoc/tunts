import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MensagemCounterService } from '../../services/mensagem-counter.service';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-modal-lrm',
  templateUrl: './modal-lrm.component.html',
  styleUrls: ['./modal-lrm.component.css']
})

export class ModalLrmComponent implements OnInit {

  destino : String;
  origem : String;
  assunto : String;
  mensagem : String;
  resposta : String;
  _id : String;
  modal_g : any;

  @ViewChild('modal2')
    modal_r: ModalComponent;
    open(dados){
        var aux = dados.split("#");
        this.modal_r.open();
        this.origem = aux[0];
        this.assunto = aux[1];
        this.mensagem= aux[2];
        this._id = aux[3];
    }


  responder(){
      let mensagem = {
        destino : this.origem,
        origem : JSON.parse(localStorage.getItem("usuario")).login,
        assunto : "RE: " + this.assunto,
        mensagem : this.mensagem + "\r\n -------------------- \r\n" + this.resposta

      }

      this.autenticacao.setMensagem(mensagem).subscribe(data => {
        if(data.mensagem=="enviada"){
          this.resposta = "";
          this.flashMessage.show("Mensagem enviada com sucesso!", {cssClass: 'alert-success', timeout: 5000});
          this.msgCounter.listarMensagens();
          this.msgCounter.getCounter();
        } else {
          this.flashMessage.show("Falha ao enviar mensagem!", {cssClass: 'alert-danger', timeout: 5000});

        }
      });
      this.modal_r.close();
  }

  fechar(){
    this.autenticacao.lerMensagem($('#_id').val()).subscribe(msg => {
      
      this.modal_r.close();
    });
  }


  constructor(private flashMessage: FlashMessagesService, 
              private autenticacao: AutenticacaoService,
              private msgCounter: MensagemCounterService ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
   
  }
}
