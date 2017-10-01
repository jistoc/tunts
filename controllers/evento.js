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
    Evento.findOne({_id : req.params.id}, (err,evento) => {
      if(err) res.json(err);
      res.json(evento);
    })
  },
  busca_usuario : (req,res,next) => {
    Evento.find({usuario : req.params.usuario}, (err,eventos) =>{
      if(err) res.json("mensagem:falha");
      res.json(eventos);
    });
    
  },
  push_iten : (req,res,next) => {
    Evento.update({_id:req.params.evento},{$push : {itens:req.body}}, (err,count) => {
      if(err) throw err;
      if(count.nModified>0)
        res.json({msg:'inserido'});
      else
        res.json({msg:'erro'});
    })
  },

  removerItem : (req,res,next) => {
    Evento.update({_id:req.params.evento},{$pull : {"itens" : { item : req.params.item}}}, (err,count) => {
      if(err) throw err;
      if(count.nModified>0)
        res.json({msg:'removido'});
      else
        res.json({msg:'erro'});
    })
  },

  atualizarItem: (req,res,next) => {
    
  },

  getPendentes : (req,res,next) => {
    Evento.find({"itens.anunciante": req.params.usuario, "itens.status": parseInt(req.params.op)}, (err,eventos) => {
      if(err) throw err;
      for(var i=eventos.length-1; i>=0; i--) {
        for(var j=eventos[i].itens.length-1; j>=0; j--) {
            if( eventos[i].itens[j].anunciante !== req.params.usuario ||  eventos[i].itens[j].status !== parseInt(req.params.op)) eventos[i].itens.splice(j,1);
        }
      }
      res.json(eventos);
    })
  },

  alterarStatus : (req,res,next) => {
    console.log(req.params.evento);
    console.log(req.params.item);
    console.log(req.params.op);
    Evento.update(
        {_id: req.params.evento, "itens.item": req.params.item},
        { 
            "$set": {
                "itens.$.status": parseInt(req.params.op)
            }
        },
        function(err,doc) {
          if(err) throw err;
          res.json({msg:"alterado"});
        }
    );
  }

}