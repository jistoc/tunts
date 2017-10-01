const express = require('express');	
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const EventoController = require('../controllers/evento');


router.route('/')
	  .post( EventoController.novo);

router.route('/busca/u/:usuario')
	  .get( EventoController.busca_usuario);

router.route('/item/:evento')
	  .post(EventoController.push_iten);

router.route('/item/:evento/:item')
	  .delete(passport.authenticate('jwt', {session:false}), EventoController.removerItem)
	  .post(passport.authenticate('jwt', {session:false}), EventoController.atualizarItem);

router.route('/:id')
	  .post(passport.authenticate('jwt', {session:false}), EventoController.alterar)
	  .get(passport.authenticate('jwt', {session:false}), EventoController.info)
	  .delete(passport.authenticate('jwt', {session:false}), EventoController.remover);

router.route('/pendentes/:usuario/:op')
	  .get(EventoController.getPendentes);

router.route('/status/:evento/:item/:op')
	  .post(EventoController.alterarStatus);

module.exports = router;
