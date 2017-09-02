import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidarUsuarioService } from '../../services/validar-usuario.service';

@Component({
  selector: 'app-editar-pagina',
  templateUrl: './editar-pagina.component.html',
  styleUrls: ['./editar-pagina.component.css']
})
export class EditarPaginaComponent implements OnInit {
  anunciante:Object;
  usuario: Object;
  nome: String;
  login: String;
  cnpj: String;
  telefone:String;
  descricao:String;
  imagem:String;
  titulo:String;

  public masctel = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private autenticacao:AutenticacaoService,
              private router:Router,
              private flashMessage: FlashMessagesService,
              private validarUsuario: ValidarUsuarioService) { }

  ngOnInit() {


    this.autenticacao.getPerfil().subscribe(perfil => {
        this.usuario = perfil.user;
        this.cnpj = perfil.user.cnpj;
        this.telefone = perfil.user.telefone;
        this.autenticacao.getAnunciante(this.usuario['login']).subscribe(anun => {
            this.titulo = anun.titulo;
            this.descricao = anun.descricao;
            this.telefone = anun.telefone;
            this.imagem = anun.imagem;
          },
          err => {
            console.log(err);
            return false;
        });
      },
      err => {
        console.log(err);
        return false;
    });

  }

  alterarPagina(){
    if(!this.validarUsuario.validarCampo(this.titulo)){
      this.flashMessage.show("Por favor informe um título", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }
    const paginaAlterada = {
      fornecedor : this.usuario['login'],
      titulo : this.titulo,
      descricao : this.descricao,
      telefone : this.telefone,
      imagem : this.imagem
    }

    this.autenticacao.alterarPagina(paginaAlterada).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});

      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }


}
