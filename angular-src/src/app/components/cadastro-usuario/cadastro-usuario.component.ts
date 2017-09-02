import { Component, OnInit } from '@angular/core';
import { ValidarUsuarioService } from '../../services/validar-usuario.service';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import {IMyOptions} from 'mydatepicker';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  nome: String;
  usuario: String;
  email: String;
  cpf: String;
  senha: String;
  confirmarSenha: String;
  uf: String;
  cidade: String;
  public masccpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ];

  private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd.mm.yyyy',
        showTodayBtn: false,
        editableDateField: true,
        dayLabels: {su: 'Seg', mo: 'Ter', tu: 'Qua', we: 'Qui', th: 'Sex', fr: 'Sab', sa: 'Dom'},
        monthLabels: { 1: 'Jan',
                       2: 'Fev',
                       3: 'Mar',
                       4: 'Abr',
                       5: 'Mai',
                       6: 'Jun',
                       7: 'Jul',
                       8: 'Ago',
                       9: 'Set',
                       10: 'Out',
                       11: 'Nov',
                       12: 'Dez' }
  };

  private nascimento: Object = { date: { year: 2017, month: 1, day: 1 } };
  private estados: Object
  constructor(private validarUsuario: ValidarUsuarioService,
              private flashMessage: FlashMessagesService,
              private autenticacao: AutenticacaoService,
              private router: Router) {


    }

  ngOnInit() {
    this.autenticacao.buscarEstados().subscribe(data => {
      this.estados = data.estados;
    });
  }
  cadastrarUsuario(form: NgForm){
    const nascimento_aux = this.nascimento['date'].month+"/"+this.nascimento['date'].day+"/"+this.nascimento['date'].year;
    const usuario = {
      nome : this.nome,
      login : this.usuario,
      email : this.email,
      cpf : this.cpf,
      senha : this.senha,
      confirmarSenha : this.confirmarSenha,
      uf : this.uf,
      cidade : this.cidade,
      nascimento: new Date(this.nascimento['date'].month+"/"+this.nascimento['date'].day+"/"+this.nascimento['date'].year)

    };


    if(!this.validarUsuario.validarData(nascimento_aux)){
      this.flashMessage.show("Por favor informe uma data de nascimento válida", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }
    //valida todos os campos
    if(!this.validarUsuario.validarCadastro(usuario)){
      this.flashMessage.show("Por favor preencha todos os campos", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }
    //valida email
    if(!this.validarUsuario.validarEmail(usuario.email)){
      this.flashMessage.show("Por favor informe um e-mail válido", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }
    //valida email
    if(!this.validarUsuario.validarCPF(usuario.cpf)){
      this.flashMessage.show("Por favor informe um CPF válido", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    //Registrar com o backend
    this.autenticacao.registrarUsuario(usuario).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
        form.reset();
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
      }
    });

  }
}
