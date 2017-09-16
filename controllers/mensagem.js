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


    Mensagem.find({destino : req.params.usuario}).sort({data:-1,status:-1}).exec( (err,mensagens) =>{
    	if(err) res.json("mensagem:falha");
    	res.json(mensagens);
    });
  	

  },
  setMensagem : (req,res,next) => {
    let mensagem = new Mensagem(req.body);
    console.log(mensagem);
    Usuario.count({login:mensagem.destino}, function(err,count){
      if(count==1){
        mensagem.save(function(err,mesg){
          if(!err){
            res.json({mensagem:"enviada"});
          } else {
            res.json({mensagem:"falha"});
          }
        });
      } else {
        res.json({mensagem:"falha"});
      }
    });
   
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
  },
  unsetMensagem : (req,res,next) => { 

    Mensagem.remove({_id : req.params.id},  (err) =>{
      if(err) res.json({mensagem:"falha"});
      res.json({mensagem:"removido"});
    });
    
  },
  updateMensagem : (req,res,next) => {
    Mensagem.update({_id : req.params.id},{$set : {status : false}},  (err,count) =>{
      if(err) res.json({mensagem:"falha"});
      res.json({mensagem:"atualizado"});
    });

  }

}
