import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private autenticacao:AutenticacaoService,private router:Router){}

  ngOnInit() {
  }
  sair(){
    this.autenticacao.logout();
    this.router.navigate(['autenticar']);
  }

}
