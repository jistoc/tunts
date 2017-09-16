const express = require('express');	
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const ItemController = require('../controllers/item');


router.post('/', ItemController.novo);
router.get('/busca/:op/:pc', ItemController.busca);
router.route('/:id')
	  .post(passport.authenticate('jwt', {session:false}), ItemController.alterar)
	  .get(passport.authenticate('jwt', {session:false}), ItemController.info)
	  .delete(passport.authenticate('jwt', {session:false}), ItemController.remover);


module.exports = router;
