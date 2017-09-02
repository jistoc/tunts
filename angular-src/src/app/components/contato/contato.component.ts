import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { ValidarUsuarioService } from '../../services/validar-usuario.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  nome : String;
  mensagem : String;
  email : String;

  constructor(private autenticacao: AutenticacaoService, private flashMessage : FlashMessagesService, private validacao: ValidarUsuarioService) { }

  ngOnInit() {
  }

  enviarEmail(form: NgForm){
    if(!this.validacao.validarEmail(this.email)){
      this.flashMessage.show("Por favor informe seu e-mail", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }
    if(!this.validacao.validarCampo(this.nome)){
      this.flashMessage.show("Por favor informe seu nome", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }
    if(!this.validacao.validarCampo(this.mensagem)){
      this.flashMessage.show("Por favor informe uma mensagem (mínimo 10 caracteres)", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }
    const email = {
      assunto : "Contato Tunts - " + this.nome,
      mensagem : "Enviado por: " + this.nome + "e-mail: "+this.email +" mensagem: "+this.mensagem,
      destinatario : 'exsm2017@gmail.com'
    }
    this.autenticacao.enviarEmail(email).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
        form.reset();
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }


}
