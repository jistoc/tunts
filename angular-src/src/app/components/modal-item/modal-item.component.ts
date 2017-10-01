import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AcessoItemService } from '../../services/acesso-item.service';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.css']
})
export class ModalItemComponent implements OnInit {
	  anunciante : String;
	  titulo : String;
  	descricao : String;
  	tipo : String;
  	categoria : String;
  	unidade : String;
  	valor : String;
    imagem : String;
  	_id : String;
  	form : any;

  @ViewChild('modalitem')
    modal: ModalComponent;
    open(){
      this.modal.open();
    }
  constructor(private flashMessage: FlashMessagesService, 
              private autenticacao: AutenticacaoService,
              private acesso_item:AcessoItemService ) { }

  salvar(){
    let item = {
      anunciante : JSON.parse(localStorage.getItem('usuario')).login,
      titulo : this.titulo,
      descricao : this.descricao,
      tipo : this.tipo,
      categoria : this.categoria,
      unidade : this.unidade,
      valor : this.valor,
      imagem : this.imagem

    }

    this.autenticacao.setItem(item).subscribe(data => {
      if(data.mensagem=="cadastrado"){
        this.acesso_item.listarItens();  
        this.flashMessage.show("Item cadastrado com sucesso!", {cssClass: 'alert-success', timeout: 5000});
      } else {
        this.flashMessage.show("Falha ao cadastrar item!", {cssClass: 'alert-danger', timeout: 5000});

      }
    });
      
  }

  ngOnInit() {
  }

}
