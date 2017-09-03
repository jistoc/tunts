
const Anunciante = require('../models/anunciante');
module.exports = {
    getAnunciante : (req,res,next) => {
      const fornecedor = req.params.fornecedor;
      Anunciante.anunciantePorNome(fornecedor, (err,anunciante)=>{
        if(err) throw err;
        res.json(anunciante);
      });
    },

    setAnunciante : (req,res,next) => {
      let novaPagina = new Anunciante({
      	fornecedor : req.body.fornecedor,
      	titulo : req.body.titulo,
      	descricao : req.body.descricao,
      	imagem : req.body.imagem,
      	telefone : req.body.telefone
      });
      console.log(novaPagina);
      Anunciante.adicionarPagina(novaPagina, (err,anunciante) => {
      	if(err){
          console.log(err);
      		res.json({success:false,msg:'Falha ao salvar dados!'});
      	} else {
      		res.json({success:true,msg:'Pàgina salva com sucesso!'});
      	}
  	  });
    },

    updateAnunciante : (req,res,next) => {
      let paginaAlterada = new Anunciante({
        fornecedor : req.body.fornecedor,
        titulo : req.body.titulo,
      	descricao : req.body.descricao,
      	imagem : req.body.imagem,
      	telefone : req.body.telefone
      });
      Anunciante.alterarPagina(paginaAlterada, (err,anunciante) => {
      	if(err){
      		return res.json({success:false,msg:'Falha ao alterar dados!'});
      	} else {
      		return res.json({success:true,msg:'Dados alterados com sucesso!'});
      	}
      });
    }
}
