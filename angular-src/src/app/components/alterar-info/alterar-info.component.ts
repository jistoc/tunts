import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidarUsuarioService } from '../../services/validar-usuario.service';

@Component({
  selector: 'app-alterar-info',
  templateUrl: './alterar-info.component.html',
  styleUrls: ['./alterar-info.component.css']
})
export class AlterarInfoComponent implements OnInit {
  usuario: Object;
  nome: String;
  email: String;
  senha: String;
  confirmarSenha: String;
  uf: String;
  cidade: String;
  login: String;
  estados: Object;
  cnpj: String;
  telefone:String;
  razao:String;
  public masctel = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public mascnpj = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/,'-',/\d/,/\d/ ];

  constructor(private autenticacao:AutenticacaoService,
              private router:Router,
              private flashMessage: FlashMessagesService,
              private validarUsuario: ValidarUsuarioService) { }

  ngOnInit() {


    this.autenticacao.getPerfil().subscribe(perfil => {
        this.usuario = perfil.user;
        this.email = perfil.user.email;
        this.cnpj = perfil.user.cnpj;
        this.telefone = perfil.user.telefone;
        this.razao = perfil.user.razao;
      },
      err => {
        console.log(err);
        return false;
    });
    this.autenticacao.buscarEstados().subscribe(data => {
      this.estados = data.estados;
    });

  }
  registrarAnunciante(){
      if(!this.validarUsuario.validarCNPJ(this.cnpj)){
        this.flashMessage.show("CNPJ inválido", {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
      if(!this.validarUsuario.validarCampo(this.razao)){
        this.flashMessage.show("Razão Social inválida!", {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
      if(!this.validarUsuario.validarTelefone(this.telefone)){
        this.flashMessage.show("Telefone inválido", {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
      const usuario = {
        cnpj : this.cnpj,
        razao : this.razao,
        telefone : this.telefone,
        login : this.usuario['login']
      }
      this.autenticacao.registrarAnunciante(usuario).subscribe(data => {
        if(data.success){
          this.flashMessage.show("Registro realizado com sucesso! Redirecionando...", {cssClass: 'alert-success', timeout: 5000});
          setTimeout((router: Router) => {
             this.router.navigate(['alterar-info']);
           }, 2000);
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        }
      });
  }
  alterarUsuario(){
    if(!this.validarUsuario.validarEmail(this.email)){
      this.flashMessage.show("Por favor informe um e-mail válido", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }
    if(this.senha==this.confirmarSenha){

      const usuario = {
        uf : this.uf,
        cidade : this.cidade,
        login : this.usuario['login'],
        email : this.email,
        senha : this.senha
      }

      this.autenticacao.alterarUsuario(usuario).subscribe(data => {
        if(data.success){
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});

        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        }
      });
    } else {
        this.flashMessage.show("As senhas precisam ser idênticas", {cssClass: 'alert-danger', timeout: 5000});
    }

  }


}
