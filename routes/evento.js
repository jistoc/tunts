const express = require('express');	
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const EventoController = require('../controllers/evento');


router.route('/')
	  .post( EventoController.novo);

router.route('/busca/:usuario')
	  .get( EventoController.busca_usuario);

router.route('/:id')
	  .post(passport.authenticate('jwt', {session:false}), EventoController.alterar)
	  .get(passport.authenticate('jwt', {session:false}), EventoController.info)
	  .delete(passport.authenticate('jwt', {session:false}), EventoController.remover);


module.exports = router;
