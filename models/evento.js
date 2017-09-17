const mongoose =  require('mongoose');
const config = require('../config/banco');

const EsquemEvento = mongoose.Schema({
	usuario : {
		type : String,
		required : true
	},
	nome : {
		type : String,
		required : true
	},
	data : {
		type : Date,
		required : true
	},
  	itens : [{
  		type : Object
  	}],
  	status : {
  		type : Boolean,
  		default : true
  	}
});

const Evento = module.exports = mongoose.model('Evento', EsquemEvento);
