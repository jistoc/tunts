import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
@Component({
  selector: 'app-modal-mensagem',
  templateUrl: './modal-mensagem.component.html',
  styleUrls: ['./modal-mensagem.component.css']
})
export class ModalMensagemComponent implements OnInit {
  anunciante : String;
  remetente : String;
  @ViewChild('modal')
    modal: ModalComponent;
    open(anunciante){
        var aux = anunciante.split("#");
        this.modal.open();
        this.anunciante = aux[0];
        this.remetente = aux[1];
    }

    enviarMensagem(){
      alert(this.anunciante+" "+this.remetente);
    }
  constructor() { }

  ngOnInit() {
  }

}
