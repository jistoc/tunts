const Item = require('../models/item');
const Anunciante = require('../models/anunciante');

module.exports = {
 
  novo : (req,res,next) =>{
    let item = new Item(req.body);
    console.log(item);
    Anunciante.count({fornecedor:item.anunciante}, function(err,count){
      if(count==1){
        item.save(function(err,mesg){
          if(!err){
            res.json({mensagem:"cadastrado"});
          } else {
            res.json({mensagem:"falha"});
          }
        });
      } else {
        res.json({mensagem:"falha"});
      }
    });
  },
  remover : (req,res,next) => { 

    Item.remove({_id : req.params.id},  (err) =>{
      if(err) res.json({mensagem:"falha"});
      res.json({mensagem:"removido"});
    });
    
  },
  alterar : (req,res,next) => {
      let alterado = new Item(req.body);
      const query  = { _id : alterado._id};
      console.log(query);
      console.log(alterado);
      Item.update(query,alterado, (err,count) =>{
        console.log(err); 
        if(err) res.json({mensagem:"falha"});
        res.json({mensagem:"atualizado"});
      });
  },
  info : (req,res,next) => {
    Item.findOne({_id : req.params.id }, (err,item) =>{
      if(err) res.json("mensagem:falha");
      res.json(item);
    });
  },
  busca : (req,res,next) => {
    switch(req.params.op){
      case '1' : st = 
        Item.find({categoria :  {$regex: '.*'+req.params.pc+'.*'} },function(err,itens){
          res.json(itens);
        });
        break;
      case '2' : 
        Item.find({tipo :  {$regex: '.*'+req.params.pc+'.*'} },function(err,itens){
          res.json(itens);
        });
        break;
       break;
      case '3' : st =
        Item.find({valor  : {$regex: '.*'+req.params.pc+'.*'} },function(err,itens){
          res.json(itens);
        });
        break;
      case '4' :
        Item.find({anunciante  :  {$regex: '.*'+req.params.pc+'.*'} },function(err,itens){
          res.json(itens);
        });
       break;
      case '5' : 
        Item.find({palavras_chave  :  {$regex: '.*'+req.params.pc+'.*'} },function(err,itens){
          res.json(itens);
        });
       break;
      default  :
        Item.find({},function(err,itens){
          if(err) throw err;
          res.json(itens);
        }); 
        break;

    }
    
  }
}