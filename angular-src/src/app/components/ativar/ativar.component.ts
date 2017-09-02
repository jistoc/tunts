import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-ativar',
  templateUrl: './ativar.component.html',
  styleUrls: ['./ativar.component.css']
})
export class AtivarComponent implements OnInit {
  u : String;
  key : String;
  constructor(private router: Router,private route: ActivatedRoute, private autenticacao : AutenticacaoService, private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['u'] !== undefined) {
        this.u = params['u'];
      }
      if(params['key'] !== undefined){
        this.key = params['key'];
      }
    });
    const usuario = {login : this.u, hash : this.key};
    this.autenticacao.ativarUsuario(usuario).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg+" Redirecionando em 5 segundos", {cssClass: 'alert-success', timeout: 5000});
        setTimeout((router: Router) => {
           this.router.navigate(['autenticar']);
       }, 5000);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }

}
