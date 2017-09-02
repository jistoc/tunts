const express = require('express');
const router = express.Router();
const Anunciante = require('../model/anunciante');

router.get('/:fornecedor', (req,res,next) => {
  const fornecedor = req.params.fornecedor;
  Anunciante.anunciantePorNome(fornecedor, (err,anunciante)=>{
    if(err) throw err;
    res.json(anunciante);
  });

});
router.post('/', (req,res,next) => {
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
});
router.put('/', (req,res,next) => {
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
});
module.exports = router;
