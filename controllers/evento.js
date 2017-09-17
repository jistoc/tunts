const Evento = require('../models/evento');

module.exports = {
 
  novo : (req,res,next) =>{
    let evento = new Evento(req.body);
    console.log(evento);
    evento.save(function(err,mesg){
      if(!err){
        res.json({mensagem:"cadastrado"});
      } else {
        res.json({mensagem:"falha"});
      }
    });
  },
  remover : (req,res,next) => { 

    Evento.remove({_id : req.params.id},  (err) =>{
      if(err) res.json({mensagem:"falha"});
      res.json({mensagem:"removido"});
    });
    
  },
  alterar : (req,res,next) => {
      let alterado = new Evento(req.body);
      const query  = { _id : alterado._id};
      Evento.update(query,alterado, (err,count) =>{
        if(err) res.json({mensagem:"falha"});
        res.json({mensagem:"atualizado"});
      });
  },
  info : (req,res,next) => {
    
  },
  busca_usuario : (req,res,next) => {
    Evento.find({usuario : req.params.usuario}, (err,eventos) =>{
      if(err) res.json("mensagem:falha");
      res.json(eventos);
    });
    
  }
}