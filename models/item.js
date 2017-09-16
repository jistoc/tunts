const mongoose =  require('mongoose');
const config = require('../config/banco');

const EsquemaItem = mongoose.Schema({
	anunciante : {
		type : String,
		required : true
	},
	tipo : {
		type : String,
		required : true
	},
	categoria	 : {
		type : String,
		required : true
	},
  	unidade : {
		type : String,
		required : true
	},
  	valor	 : {
		type : Number,
		required : true
	},
	titulo	 : {
		type : String,
		required : true
	},
	descricao	 : {
		type : String,
		required : true
	},
	palavras_chave	: {
		type : [String]
	},
	created_at : {
		type : Date,
		default : Date.now
	},
	modified_at : {
		type : Date,
		default : Date.now
	},
	imagem : {
		type : String,
		default : ' '
	}
});

const Item = module.exports = mongoose.model('Item', EsquemaItem);
