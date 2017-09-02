import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private autenticacao:AutenticacaoService, private router:Router){

  }

  canActivate(){
    if(this.autenticacao.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/autenticar']);
      return false;
    }
  }
}
