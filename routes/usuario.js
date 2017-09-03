const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UsuarioController = require('../controllers/usuario');


router.post('/', UsuarioController.novo);
router.post('/ativar', UsuarioController.ativar);
router.post('/recuperar', UsuarioController.recuperar);
router.post('/reenviar', UsuarioController.reenviar);
router.put('/', UsuarioController.alterar);
router.post('/anunciante', UsuarioController.setAnunciante);
router.post('/autenticar', UsuarioController.autenticar);
router.get('/perfil', passport.authenticate('jwt', {session:false}), UsuarioController.perfil);
router.get('/estados', UsuarioController.estados);

module.exports = router;
