import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AutenticacaoService {
 authToken: any;
 usuario: any;

  constructor(private http:Http) { }

  recuperarSenha(usuario){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/usuario/recuperar',usuario,{headers:headers}).map(res => res.json());
  }
  registrarAnunciante(usuario){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/usuario/anunciante',usuario,{headers:headers}).map(res => res.json());
  }
  enviarConfirmacao(usuario){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/usuario/reenviar',usuario,{headers:headers}).map(res => res.json());
  }
  ativarUsuario(usuario){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/usuario/ativar',usuario,{headers:headers}).map(res => res.json());
  }
  registrarUsuario(usuario){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/usuario/',usuario,{headers:headers}).map(res => res.json());
  }
  alterarUsuario(usuario){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/usuario/',usuario,{headers:headers}).map(res => res.json());
  }
  alterarPagina(paginaAlterada){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/anunciante/',paginaAlterada,{headers:headers}).map(res => res.json());
  }
  enviarEmail(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    console.log(email);
    return this.http.post('http://localhost:3000/mail/enviar',email,{headers:headers}).map(res => res.json());
  }
  autenticarUsuario(usuario){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/usuario/autenticar',usuario,{headers:headers}).map(res => res.json());
  }
  buscarEstados(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/usuario/estados',{headers:headers}).map(res => res.json());

  }
  getPerfil(){
    let headers = new Headers();
    this.carregarToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/usuario/perfil',{headers: headers})
      .map(res => res.json());
  }

  getNovasMensagens(usuario){
    let headers = new Headers();
    this.carregarToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let end = 'http://localhost:3000/mensagem/'+usuario+'/1';
    return this.http.get(end,{headers: headers})
      .map(res => res.json());
  }
  getMensagensRecebidas(usuario){
    let headers = new Headers();
    this.carregarToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let end = 'http://localhost:3000/mensagem/'+usuario+'/recebidas';
    return this.http.get(end,{headers: headers})
      .map(res => res.json());
  }
  setMensagem(mensagem){
    let headers = new Headers();
    this.carregarToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/mensagem/',mensagem,{headers: headers})
      .map(res => res.json());
  }
  removerMensagem(id){
    let headers = new Headers();
    this.carregarToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.delete('http://localhost:3000/mensagem/'+id,{headers: headers})
      .map(res => res.json());
  }
  getAnunciante(anunciante){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/anunciante/'+anunciante,{headers: headers})
      .map(res => res.json());
  }
  salvarInformacoesUsuario(token,usuario){
      localStorage.setItem('id_token',token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.authToken = token;
      this.usuario = usuario;
  }

  carregarToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loggedIn(){
    return tokenNotExpired('id_token');
  }
  logout(){
    this.authToken = null;
    this.usuario = null;
    localStorage.clear();
  }
  getUsuario(){
    return 'ola';
  }
}
