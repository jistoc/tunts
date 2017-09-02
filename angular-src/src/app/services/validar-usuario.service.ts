import { Injectable } from '@angular/core';

@Injectable()
export class ValidarUsuarioService {

  constructor() { }
  validarCadastro(usuario){
      if(usuario.login == undefined || usuario.nome == undefined || usuario.cpf == undefined || usuario.email == undefined || usuario.senha == undefined || usuario.confirmarSenha == undefined || usuario.uf == undefined || usuario.cidade == undefined){
        return false;
      } else {
        return true;
      }
  }
  validarTelefone(telefone){

    if(telefone==undefined)
      return false;
    telefone = telefone.replace("(","");
    telefone = telefone.replace(" ","");
    telefone = telefone.replace(")","");
    telefone = telefone.replace("-","");
    telefone = telefone.replace("_","");
    console.log(telefone);

    if(telefone.length<10)
      return false;
      
    return (!isNaN(parseFloat(telefone)) && isFinite(telefone));

    //return new RegExp('/^\([1-9]{2}\)[0-9]{4,5}-[0-9]{4}$/').test(telefone);
  }
  validarSenha(senha,senha2){
    if(senha!=senha2){
      return false;
    } else {
      return true;
    }
  }
  validarCampo(campo){
    if(campo==undefined){
      return false;
    } else {
      return true;
    }
  }
  validarData(data){
     var hoje = new Date();
     var nascimento = new Date(data);
     var idade = hoje.getFullYear() - nascimento.getFullYear();
     var m = hoje.getMonth() - nascimento.getMonth();
     if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
         idade--;
     }
     return idade>=18;
  }

  validarCPF(strCPF) {
    strCPF = strCPF.replace(".","");
    strCPF = strCPF.replace(".","");
    strCPF = strCPF.replace("-","");

    var Soma;
    var Resto;
    var i;
    Soma = 0;
  	if (strCPF == "00000000000") return false;
  	for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  	Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
  	Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
  }

  validarEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
  validarCNPJ(cnpj) {
    if(cnpj==undefined)
      return false;
    cnpj = cnpj.replace(".","");
    cnpj = cnpj.replace(".","");
    cnpj = cnpj.replace("-","");
    cnpj = cnpj.replace("/","");

    console.log(cnpj);
    //cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0,tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;

    return true;
  }

}
