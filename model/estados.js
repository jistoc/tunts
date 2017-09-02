const mongoose =  require('mongoose');
const config = require('../config/banco');

const  EsquemaEstados = mongoose.Schema({
	sigla : {
		type : String
	},
	nome : {
		type : String
	},
	cidades: [{
    type: String
	}]

});

const Estados = module.exports = mongoose.model('Estados', EsquemaEstados);

module.exports.buscarEstados = function(callback){
	Estados.find({},callback);
}
