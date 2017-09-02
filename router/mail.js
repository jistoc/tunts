const express = require('express');
const router = express.Router();
const mail = require('../model/mail');



router.post('/enviar', (req,res,next) => {


	let email = new mail.Email(req.body.destinatario,
												req.body.assunto,
												req.body.mensagem);
	mail.enviarEmail(email, function(err,r){
		if(err){
			console.log(err);
			res.json({success:false,msg:'Falha ao enviar e-mail!'});
		} else {
			res.json({success:true,msg:'E-mail enviado com sucesso!'});
		}
	});

});

module.exports = router;
