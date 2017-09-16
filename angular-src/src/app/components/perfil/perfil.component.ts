import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { MensagemCounterService } from '../../services/mensagem-counter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Object;
  nome: String;
  email: String;
  senha: String;
  confirmarSenha: String;
  uf: String;
  cidade: String;

  constructor(private autenticacao:AutenticacaoService,
              private router:Router, 
              private msgCounter:MensagemCounterService) {

  }

    ngOnInit() {
      this.autenticacao.getPerfil().subscribe(perfil => {
        this.usuario = perfil.user;
        this.email = perfil.user.email
        this.nome = perfil.user.nome;
        this.uf = perfil.user.uf;
        this.cidade = perfil.user.cidade;
        this.msgCounter.getCounter();
      },
      err => {
        console.log(err);
        return false;
      });
    }

}
