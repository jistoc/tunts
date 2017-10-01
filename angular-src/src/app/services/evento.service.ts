import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class EventoService {

  authToken : any;
  usuario : string;
  pendentes : number;

  constructor(private http : Http) { 

  }

  setEvento(evento){
    let headers = new Headers();
    this.carregarToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/evento/',evento,{headers: headers})
      .map(res => res.json());
  }
  getEventosUsuario(){
    let headers = new Headers();
    this.carregarToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/evento/busca/u/'+this.usuario,{headers: headers})
      .map(res => res.json());
  }

  carregarToken(){
    const token = localStorage.getItem('id_token');
    this.usuario = JSON.parse(localStorage.getItem('usuario')).login;
    this.authToken = token;
  }
  apagar(id){
    let headers = new Headers();
    this.carregarToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.delete('http://localhost:3000/evento/'+id,{headers: headers})
      .map(res => res.json());
  }

  getEvento(id){
    let headers = new Headers();
    this.carregarToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let end = 'http://localhost:3000/evento/'+id;
    return this.http.get(end,{headers: headers})
      .map(res => res.json());
  }

  unsetItemEvento(idItem,evento){
    let headers = new Headers();
    this.carregarToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let end = 'http://localhost:3000/evento/item/'+evento+'/'+idItem;
    return this.http.delete(end,{headers: headers})
      .map(res => res.json());
  }
  alterarStatus(idItem,evento,op){
    let headers = new Headers();
    this.carregarToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let end = 'http://localhost:3000/evento/status/'+evento+'/'+idItem+'/'+op;
    return this.http.post(end,{headers: headers})
      .map(res => res.json());
  }
  getPendentes(op){
    const anunciante = JSON.parse(localStorage.getItem('usuario')).login;

    let headers = new Headers();
    this.carregarToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let end = 'http://localhost:3000/evento/pendentes/'+anunciante+'/'+op;
    return this.http.get(end,{headers: headers})
      .map(res => res.json());
  }

}
