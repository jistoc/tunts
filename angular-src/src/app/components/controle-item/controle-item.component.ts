import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AcessoItemService } from '../../services/acesso-item.service';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ModalItemComponent } from '../modal-item/modal-item.component';
import { ModalAltitemComponent } from '../modal-altitem/modal-altitem.component';

@Component({
  selector: 'app-controle-item',
  templateUrl: './controle-item.component.html',
  styleUrls: ['./controle-item.component.css']
})
export class ControleItemComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

	@ViewChild(ModalItemComponent) modalItem: ModalComponent;
	open(){
	  //var aux = JSON.parse(localStorage.getItem('usuario')).login+"#";
	  this.modalItem.open();
	}

  @ViewChild(ModalAltitemComponent) modalAltItem: ModalComponent;
  alterar(id){
    //var aux = JSON.parse(localStorage.getItem('usuario')).login+"#";
    for(let i = 0; i<this.itens.itens.length;i++){
        if(this.itens.itens[i]._id==id){
          this.modalAltItem.open(
                this.itens.itens[i].titulo+"#"+
                this.itens.itens[i].descricao+"#"+
                this.itens.itens[i].tipo+"#"+
                this.itens.itens[i].categoria+"#"+
                this.itens.itens[i].unidade+"#"+
                this.itens.itens[i].valor+"#"+
                this.itens.itens[i].imagem+"#"+
                this.itens.itens[i]._id);
          continue;
        }
      }
  }

  	constructor(private autenticacao:AutenticacaoService,
              private router:Router,
              private flashMessage: FlashMessagesService,
              private itens:AcessoItemService) { }

  	ngOnInit() {
      this.itens.listarItens();
      this.dtOptions = {
        language : {
          emptyTable :  "Nenhum registro encontrado",
          info : "Mostrando de _START_ até _END_ de _TOTAL_ registros",
          infoEmpty :  "Mostrando 0 até 0 de 0 registros",
          infoFiltered :  "(Filtrados de _MAX_ registros)",
          infoPostFix : "",
          thousands : ".",
          lengthMenu : "_MENU_ resultados por página",
          loadingRecords : "Carregando...",
          processing : "Processando...",
          zeroRecords : "Nenhum registro encontrado",
          search : "Pesquisar",
          paginate: {
          next: "Próximo",
          previous: "Anterior",
          first: "Primeiro",
          last: "Último"
          },
          aria : {
              sortAscending: ": Ordenar colunas de forma ascendente",
              sortDescending: ": Ordenar colunas de forma descendente"
          }
        }
      };
  	}

    remover(id){
    this.autenticacao.removerItem(id).subscribe(total => {
      if(total.mensagem == 'removido'){
        this.flashMessage.show("Item removido com sucesso!", {cssClass: 'alert-success', timeout: 5000});
        this.ngOnInit();
      } else {
        this.flashMessage.show("Falha ao remover item!", {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }

}
