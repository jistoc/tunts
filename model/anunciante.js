const mongoose =  require('mongoose');
const config = require('../config/banco');

const EsquemaAnunciante = mongoose.Schema({
	fornecedor : {
		type : String,
		required : true,
    unique : true
	},
	titulo : {
		type : String,
		required : true
	},
	descricao	 : {
		type : String
	},
  telefone	 : {
		type : String,
		required : true
	},
  imagem	 : {
		type : String,
    default : "http://via.placeholder.com/800x200"
	}
});

const Anunciante = module.exports = mongoose.model('Anunciante', EsquemaAnunciante);

module.exports.anunciantePorId = function(id,callback){
	Anunciante.findById(id,callback);
}
module.exports.anunciantePorNome = function(fornecedor,callback){
	const query = {fornecedor:fornecedor};
	Anunciante.findOne(query,callback);
}
module.exports.adicionarPagina = function(novaPagina, callback){
	novaPagina.save(callback);
}
module.exports.alterarPagina = function(paginaAlterada,callback){
	Anunciante.anunciantePorNome(paginaAlterada.fornecedor, (err,anunciante) =>{
    if(anunciante){
      if(paginaAlterada.telefone!=undefined){
        anunciante.telefone = paginaAlterada.telefone;
      }
      if(paginaAlterada.telefone!=undefined){
        anunciante.descricao = paginaAlterada.descricao;
      }
      if(paginaAlterada.telefone!=undefined){
        anunciante.imagem = paginaAlterada.imagem;
      }
      if(paginaAlterada.telefone!=undefined){
        anunciante.titulo = paginaAlterada.titulo;
      }
      anunciante.save(callback);
    } else {
      callback(true,"Anunciante não encontrado!");
    }

	})
}
