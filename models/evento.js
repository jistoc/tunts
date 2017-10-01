const mongoose =  require('mongoose');
const config = require('../config/banco');

const EsquemEvento = mongoose.Schema({
	usuario : {
		type : String,
		required : true
	},
	titulo : {
		type : String,
		required : true
	},
	data : {
		type : Date,
		required : true
	},
  	itens : {
  		type : Array
  	},
  	status : {
  		type : Boolean,
  		default : true
  	}
});

const Evento = module.exports = mongoose.model('Evento', EsquemEvento);
