import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ModalLrmComponent } from '../modal-lrm/modal-lrm.component';
import { ModalMensagemComponent } from '../modal-mensagem/modal-mensagem.component';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MensagemCounterService } from '../../services/mensagem-counter.service';    

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {
	 
  dtOptions: DataTables.Settings = {};
  
  @ViewChild(ModalLrmComponent) modalMensagem: ModalComponent;
  ler(id) {
      for(let i = 0; i<this.msgCounter.msgs.length;i++){
        if(this.msgCounter.msgs[i]._id==id){
          this.modalMensagem.open(this.msgCounter.msgs[i].origem+"#"+this.msgCounter.msgs[i].assunto+"#"+this.msgCounter.msgs[i].mensagem+"#"+this.msgCounter.msgs[i]._id);
          continue;
        }
      }
  }

  @ViewChild(ModalMensagemComponent) modalMensagemN: ModalComponent;
  open() {
      this.modalMensagemN.open(JSON.parse(localStorage.getItem('usuario')).login + "#");
  }



  constructor(private autenticacao:AutenticacaoService,
              private router:Router,
              private flashMessage: FlashMessagesService,
              private msgCounter:MensagemCounterService) { }

  ngOnInit() {
  	
    this.msgCounter.listarMensagens();
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

  ngAfterViewInit(): void {
   
  }

  remover(id){
    this.autenticacao.removerMensagem(id).subscribe(total => {
      if(total.mensagem == 'removido'){
        this.flashMessage.show("Mensagem apagada com sucesso!", {cssClass: 'alert-success', timeout: 5000});
        $("#tbodyid").empty();
        this.msgCounter.getCounter();
        this.ngOnInit();
      } else {
        this.flashMessage.show("Falha ao apagar mensagem!", {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }

}
