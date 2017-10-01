import { Component, OnInit, ViewChild } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EventoService } from '../../services/evento.service';
import { ModalMensagemComponent } from '../modal-mensagem/modal-mensagem.component';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})

export class PedidosComponent implements OnInit {
  pendentes : any;
  confirmados : any;
  rejeitados : any;
  usuario : String;
  constructor(private router : Router, 
  			  private route : ActivatedRoute,
  			  private autenticacao :AutenticacaoService,
  			  private flashMessage : FlashMessagesService,
  			  private evtService : EventoService) { }

  @ViewChild(ModalMensagemComponent) modalMensagem: ModalComponent;

    open(dest) {
        var aux = this.usuario+"#"+dest;
        this.modalMensagem.open(aux);
    }


  ngOnInit() {
    this.evtService.getPendentes(1).subscribe(data => {
      
      for(var i = 0; i<data.length;i++){
        data[i].data = data[i].data.substring(8,10)+"/"+
                              data[i].data.substring(5,7)+"/"+
                             data[i].data.substring(0,4);
      }
      this.pendentes = data;  
    });
    this.evtService.getPendentes(2).subscribe(data => {
      for(var i = 0; i<data.length;i++){
        data[i].data = data[i].data.substring(8,10)+"/"+
                              data[i].data.substring(5,7)+"/"+
                             data[i].data.substring(0,4);
      }
      this.confirmados = data;
    });
    this.evtService.getPendentes(3).subscribe(data => {
      for(var i = 0; i<data.length;i++){
        data[i].data = data[i].data.substring(8,10)+"/"+
                              data[i].data.substring(5,7)+"/"+
                             data[i].data.substring(0,4);
      }
      this.rejeitados = data;
    });


    this.autenticacao.getPerfil().subscribe(perfil => {
      this.usuario = perfil.user.login;
    });
    
  }
  alterarStatus(evento,item,op){
    
      this.evtService.alterarStatus(item,evento,op).subscribe(data => {
        if(data.msg=="alterado"){
          if(op==2){
            this.flashMessage.show("Item confirmado, aguarde contato do usuário ou envie uma mensagem!", {cssClass: 'alert-success', timeout: 5000});
          } else {
            this.flashMessage.show("Item rejeitado, aguarde contato do usuário ou envie uma mensagem!", {cssClass: 'alert-success', timeout: 5000});

          }
          this.ngOnInit();
        }
      })
  }
}
