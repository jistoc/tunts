const mongoose =  require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/banco');
const mail = require('../model/mail');
const crypto = require('crypto');
//esquema

const EsquemaUsuario = mongoose.Schema({
	nome : {
		type : String,
		required : true
	},
	login : {
		type : String,
		required : true,
		unique : true
	},
	email	 : {
		type : String,
		required : true,
		unique : true
	},
	senha : {
		type : String,
		required : true
	},
	cpf : {
		type : String,
		required : true,
		unique : true
	},
	uf : {
		type : String,
		required : true
	},
	cidade : {
		type : String,
		required : true
	},
	dataNacimento : {
		type : Date,
		required : true
	},
	dataCriacao: {
		type: Date,
		default: Date.now
	},
	situacao: {
        type: Boolean,
        default: false
  },
	hash:{
		type:String,
		required: true
	},
	cnpj:{
		type:String,
		required: false,
		unique: true
	},
	razao:{
		type:String,
		required: false,
		default: ""
	},
	telefone:{
		type:String,
		required: false,
		default: ""
	}
});

const Usuario = module.exports = mongoose.model('Usuario', EsquemaUsuario);

module.exports.usuarioPorId = function(id,callback){
	Usuario.findById(id,callback);
}
module.exports.usuarioPorNome = function(login,callback){
	const query = {login:login};
	Usuario.findOne(query,callback);
}
module.exports.usuarioPorEmail = function(email,callback){
	const query = {email:email};
	Usuario.findOne(query,callback);
}
module.exports.ativarUsuario = function(info,callback){
	Usuario.usuarioPorNome(info.login, (err,usuario) => {
		if(usuario){
			if(usuario.situacao==false){
				if(info.hash==usuario.hash){
					usuario.situacao = true;
					usuario.save(callback);
				} else {
					callback(true,info);
				}
			} else {
				callback(true,info)
			}
		} else {
			callback(true,info);
		}
	})
}
module.exports.alterarUsuario = function(usuarioAlterado,callback){
	Usuario.usuarioPorNome(usuarioAlterado.login, (err,usuario) =>{
		if(usuarioAlterado.senha!=undefined){
			bcrypt.genSalt(10, (err,salt) => {
				bcrypt.hash(usuarioAlterado.senha, salt, (er,hash) => {
					if(er) throw er;
					usuario.senha = hash;
					if(usuarioAlterado.cidade!=undefined){
						usuario.cidade = usuarioAlterado.cidade;
					}
					if(usuarioAlterado.uf!=undefined){
						usuario.uf = usuarioAlterado.uf;
					}
					if(usuarioAlterado.email!=undefined){
						usuario.email = usuarioAlterado.email;
					}
					usuario.save(callback);
				});
			});
		} else {
			if(usuarioAlterado.cidade!=undefined){
				usuario.cidade = usuarioAlterado.cidade;
			}
			if(usuarioAlterado.uf!=undefined){
				usuario.uf = usuarioAlterado.uf;
			}
			if(usuarioAlterado.email!=undefined){
				usuario.email = usuarioAlterado.email;
			}
			usuario.save(callback);
		}

	})
}
module.exports.registrarAnunciante = function(usuarioAlterado,callback){
	Usuario.usuarioPorNome(usuarioAlterado.login, (err,usuario) =>{

			if(usuarioAlterado.razao!=undefined){
				usuario.razao = usuarioAlterado.razao;
			}
			if(usuarioAlterado.telefone!=undefined){
				usuario.telefone = usuarioAlterado.telefone.replace("_","");
				usuario.telefone = usuarioAlterado.telefone;
			}
			if(usuarioAlterado.cnpj!=undefined){
				usuario.cnpj = usuarioAlterado.cnpj;
			}
			usuario.save(callback);
		});
}
module.exports.recuperarSenha = function(usuario,callback){
	Usuario.usuarioPorEmail(usuario.email, (err,usuario) =>{
		if(usuario){
			var novaSenha = crypto.randomBytes(4).toString('hex');
			bcrypt.genSalt(10, (err,salt) => {
				bcrypt.hash(novaSenha, salt, (err,hash) => {
					if(err) throw err;
					usuario.senha = hash;
					let email = new mail.Email(usuario.email,
																'Tunts - Senha redefinida',
																'Sua senha foi redefinda para: '+ novaSenha);
					usuario.save();
					mail.enviarEmail(email,callback);
				});
			});
		} else {
			callback(true,usuario);
		}
	});
}
module.exports.enviarAtivacao = function(usuario,callback){
	Usuario.usuarioPorEmail(usuario.email, (err,usuario) =>{
		if(usuario){
			if(usuario.situacao==true){
				callback(true,"Conta já ativada!");
			} else {
				let email = new mail.Email(usuario.email,
															'Tunts - Ativação',
															'Para ativar sua conta acesse o link:  http://localhost:4200/ativar;u='+usuario.login+';key='+usuario.hash);
															//+req.protocol + '://' + req.get('host') + req.originalUrl+
				mail.enviarEmail(email, callback);
			}
		} else {
			callback(true,"Usuario não cadastrado");
		}
	});
}
module.exports.adicionarUsuario = function(novoUsuario, callback){
	bcrypt.genSalt(10, (err,salt) => {
		bcrypt.hash(novoUsuario.senha, salt, (err,hash) => {
			if(err) throw err;
			novoUsuario.senha = hash;
			novoUsuario.cnpj = novoUsuario.login;
			novoUsuario.save(callback);
		});
	});
}
module.exports.compararSenha = function(senhaInformada,hash,callback){
	bcrypt.compare(senhaInformada,hash, (err,isMatch) => {
		if(err) throw err;
		callback(null, isMatch);
	});
}
