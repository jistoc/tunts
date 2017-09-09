import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-autenticar',
  templateUrl: './autenticar.component.html',
  styleUrls: ['./autenticar.component.css']
})
export class AutenticarComponent implements OnInit {
  usuario: String;
  senha: String;
  op : Boolean;
  rmail : String;
  constructor(private autenticacao: AutenticacaoService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.op = true;
  }
  enviar(){
    if(!this.op){
      if( this.rmail == undefined){
        this.flashMessage.show("Informe um e-mail", {cssClass : 'alert-danger', timeout:5000});
      } else {
          const usuario = {
           email : this.rmail
          }
          this.autenticacao.recuperarSenha(usuario).subscribe(data => {
          if(data.success){
            this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
          } else {
            this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          }
        });
      }
    } else {
      if( this.rmail == undefined){
        this.flashMessage.show("Informe um email", {cssClass : 'alert-danger', timeout:5000});
      } else {
          const usuario = {
           email : this.rmail
          }
          this.autenticacao.enviarConfirmacao(usuario).subscribe(data => {
          if(data.success){
            this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
          } else {
            this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          }
        });
      }
    }
  }
  confirmacao(o){
    if(o==1){
      this.op = true;
    } else {
      this.op = false;
    }

  }

  autenticarUsuario(){
    if(this.usuario == undefined || this.senha ==undefined){
      this.flashMessage.show('Preencha todos os campos!', {cssClass: 'alert-danger', timeout: 5000});
    } else {
       const usuario = {
          login : this.usuario,
          senha : this.senha
       }

       this.autenticacao.autenticarUsuario(usuario).subscribe(data => {
         if(data.success){
            this.autenticacao.salvarInformacoesUsuario(data.token,data.usuario);
            this.router.navigate(['home']);
         } else {
            this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
         }
       });
     }

  }


}
