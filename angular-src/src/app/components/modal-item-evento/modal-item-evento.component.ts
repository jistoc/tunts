import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AcessoItemService } from '../../services/acesso-item.service';
import { EventoService } from '../../services/evento.service';   

@Component({
  selector: 'app-modal-item-evento',
  templateUrl: './modal-item-evento.component.html',
  styleUrls: ['./modal-item-evento.component.css']
})
export class ModalItemEventoComponent implements OnInit {
	anunciante : String;
  	titulo : String;
  	descricao : String;
  	tipo : String;
  	categoria : String;
  	unidade : String;
  	valor : number;
    imagem : String;
    obs : String;
    quantidade : number;
  	_id : String;
  	form : any;
    eventos : any;
    evento : String;
    total : String;

  @ViewChild('modalitemevento')
    modal: ModalComponent;
    open(id){
      this.modal.open();
      this.evento = '';
      this.obs = '';
      this._id = id;
      this.acesso_item.getItem(id).subscribe(data => {
      	this.titulo = data.titulo;
        this.descricao = data.descricao;
        this.imagem = data.imagem;
        this.valor = data.valor;
        this.anunciante = data.anunciante;
        this.quantidade = 1;
        this.evento = '-1';
        this.total = (this.valor).toFixed(2);
        switch(data.unidade){
          
          case "u" : this.unidade = 'Unitário'; break;
          case "t" : this.unidade = 'Dezena'; break;
          case "d" : this.unidade = 'Duzia'; break;
          case "c" : this.unidade = 'Centena'; break;
          case "k" : this.unidade = 'Kilo'; break;
          case "l" : this.unidade = 'Litro'; break;
          case "h" : this.unidade = 'Hora'; break;
          case "d" : this.unidade = 'Dia'; break;
          case "n" : this.unidade = 'Não se aplica'; break;
        }

      });

      this.evtService.getEventosUsuario().subscribe(data => {
        this.eventos = data;
      });
    }
   constructor(private flashMessage: FlashMessagesService, 
              private autenticacao: AutenticacaoService,
              private acesso_item: AcessoItemService,
              private evtService : EventoService) { }

  ngOnInit() {

  }

  atualizar($event){
    this.total = (this.valor*$event).toFixed(2);
    this.quantidade=$event;
  }
  atualizarEvento($event){
    this.evento = $event;
  }

  inserirItem(){
    if(this.quantidade < 0 || !Number.isInteger(this.quantidade)){
       this.flashMessage.show("Quantidade inválida!", {cssClass: 'alert-danger', timeout: 5000});
      
    } else {
      if(this.evento == '-1'){
       this.flashMessage.show("Escolha um evento!", {cssClass: 'alert-danger', timeout: 5000});
       
      } else {

        let objEvento = {
          anunciante : this.anunciante,
          item :  this._id,
          quantidade : this.quantidade,
          titulo : this.titulo,
          obs : this.obs,
          status : 0,
          total : this.total,
          valor : this.valor
        }
        
        this.acesso_item.setItem(objEvento, this.evento).subscribe(data => {
          if(data.msg == 'inserido'){
            this.flashMessage.show("Item inserido", {cssClass: 'alert-success', timeout: 5000});
          }
        });

        
      }
    }
  }
}
