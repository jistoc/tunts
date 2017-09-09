const express = require('express');
const router = express.Router();
const MensagemController = require('../controllers/mensagem');

const passport = require('passport');
const jwt = require('jsonwebtoken');


router.route('/')
	  .post(passport.authenticate('jwt', {session:false}),MensagemController.setMensagem);

router.route('/:usuario/enviadas')
	  .get(passport.authenticate('jwt', {session:false}),MensagemController.getEnviadas);

router.route('/:usuario/recebidas')
	  .get(passport.authenticate('jwt', {session:false}),MensagemController.getRecebidas);

router.route('/:usuario/:op')
	  .get(passport.authenticate('jwt', {session:false}),MensagemController.getCount);


module.exports = router;
