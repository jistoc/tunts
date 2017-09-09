const Mensagem = require('../models/mensagem');
const Usuario = require('../models/usuario');
module.exports = {
  getEnviadas : (req,res,next) => {


    Mensagem.find({origem : req.params.usuario }, (err,mensagens) =>{
    	if(err) res.json("mensagem:falha");
    	res.json(mensagens);
    });
  	

  },
  getRecebidas : (req,res,next) => {


    Mensagem.find({destino : req.params.usuario},  (err,mensagens) =>{
    	if(err) res.json("mensagem:falha");
    	res.json(mensagens);
    });
  	

  },
  setMensagem : (req,res,next) => {
    let mensagem = new Mensagem(req.body);
    mensagem.save(function(err,mesg){
    	if(!err){
    		res.json("mensagem:sucesso");
    	} else {
    		res.json("mensagem:falha");
    	}
    })
  },
  getCount : (req,res,next) => {
  	switch(req.params.op){
  		case '1' : st = true; break;
  		case '2' : st = false; break;
  		default  : st = undefined; break;

  	}
  	if(st!==undefined){

	    Mensagem.count({destino : req.params.usuario, status : st},function(err,count){
	      res.json(count);
	    });
  	} else {
  		Mensagem.count({destino : req.params.usuario},function(err,count){
	      res.json(count);
	    });
  	}
  }

}
