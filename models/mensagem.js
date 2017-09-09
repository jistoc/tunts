const mongoose =  require('mongoose');
const config = require('../config/banco');

const EsquemaMensagem = mongoose.Schema({
	origem : {
		type : String,
		required : true
	},
	destino : {
		type : String,
		required : true
	},
	assunto	 : {
		type : String,
		required : true
	},
  	mensagem : {
		type : String,
		required : true
	},
  	status	 : {
		type : Boolean,
    	default : true
	},
	data	 : {
		type : Date,
    	default : Date.now
	}
});

const Mensagem = module.exports = mongoose.model('Mensagem', EsquemaMensagem);
