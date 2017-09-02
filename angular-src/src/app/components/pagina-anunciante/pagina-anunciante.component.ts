import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { ModalMensagemComponent } from '../modal-mensagem/modal-mensagem.component';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


@Component({
  selector: 'app-pagina-anunciante',
  templateUrl: './pagina-anunciante.component.html',
  styleUrls: ['./pagina-anunciante.component.css']
})
export class PaginaAnuncianteComponent implements OnInit {
  anunciante : string;
  titulo : String;
  descricao : String;
  imagem : String;
  telefone : String;
  qrCodeURL : String;
  usuario : String;

  @ViewChild(ModalMensagemComponent) modalMensagem: ModalComponent;

  open() {
      var aux = this.anunciante+"#"+this.usuario;
      this.modalMensagem.open(aux);
  }
  constructor(private router: Router, private route: ActivatedRoute,private autenticacao:AutenticacaoService) { }

  ngOnInit() {
  //
    this.route.params.forEach((params: Params) => {
      if (params['anunciante'] !== undefined) {
        this.anunciante = params['anunciante'];
        this.autenticacao.getAnunciante(this.anunciante).subscribe(anun => {
            this.titulo = anun.titulo;
            this.descricao = anun.descricao;
            this.telefone = anun.telefone;
            this.imagem = anun.imagem;
            this.qrCodeURL = "http://localhost:4200/a/" +this.anunciante ;
          },
          err => {
            console.log(err);
            return false;
        });
      }
    });
    this.autenticacao.getPerfil().subscribe(perfil => {
      this.usuario = perfil.user.login;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
