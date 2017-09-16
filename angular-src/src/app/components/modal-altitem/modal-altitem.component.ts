
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AcessoItemService } from '../../services/acesso-item.service';


@Component({
  selector: 'app-modal-altitem',
  templateUrl: './modal-altitem.component.html',
  styleUrls: ['./modal-altitem.component.css']
})
export class ModalAltitemComponent implements OnInit {
	anunciante : String;
	titulo : String;
  	descricao : String;
  	tipo : String;
  	categoria : String;
  	unidade : String;
  	valor : String;
    imagem : String;
  	_id : String;
  	

  @ViewChild('modalaltitem')
    modal: ModalComponent;
    open(dados){
  		var aux = dados.split("#");
   		this.modal.open();
  		this.titulo = aux[0];
  		this.descricao = aux[1];
  		this.tipo = aux[2];
  		this.categoria = aux[3];
  		this.unidade = aux[4];
  		this.valor = aux[5];
  		this.imagem = aux[6];
  		this._id = aux[7];
    }
  constructor(private flashMessage: FlashMessagesService, 
              private autenticacao: AutenticacaoService,
              private acesso_item:AcessoItemService ) { }

    alterar(){
	    let item = {
  			anunciante : JSON.parse(localStorage.getItem('usuario')).login,
  			titulo : this.titulo,
  			descricao : this.descricao,
  			tipo : this.tipo,
  			categoria : this.categoria,
  			unidade : this.unidade,
  			valor : this.valor,
  			imagem : this.imagem,
        _id : this._id

    	}

    this.autenticacao.updateItem(item).subscribe(data => {
      if(data.mensagem=="atualizado"){
        this.acesso_item.listarItens();
        this.anunciante = "";
        this.titulo = "";
        this.descricao = "";
        this.tipo = "";
        this.categoria = "";
        this.unidade = "";
        this.valor = "";
        this.imagem = "";
        this.flashMessage.show("Item alterado com sucesso!", {cssClass: 'alert-success', timeout: 5000});
      } else {
        this.flashMessage.show("Falha ao alterar item!", {cssClass: 'alert-danger', timeout: 5000});

      }
    });
      
  }

  ngOnInit() {
  }

}
