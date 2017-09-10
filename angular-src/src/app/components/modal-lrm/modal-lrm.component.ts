import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FlashMessagesService } from 'angular2-flash-messages';


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

  @ViewChild('modal')
    modal: ModalComponent;
    open(dados){
        var aux = dados.split("#");
        this.modal.open();
        this.origem = aux[0];
        this.assunto = aux[1];
        this.mensagem= aux[2];
    }

  constructor(private flashMessage: FlashMessagesService, private autenticacao: AutenticacaoService ) { }

  ngOnInit() {

  }
}
