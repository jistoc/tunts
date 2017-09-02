const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuario');
const Estado = require('../model/estados');
const config = require('../config/banco');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mail = require('../model/mail');
const Anunciante = require('../model/anunciante');

router.post('/', (req,res,next) => {
	let novoUsuario = new Usuario({
		nome : req.body.nome,
		login : req.body.login,
		email : req.body.email,
		senha : req.body.senha,
		cpf : req.body.cpf,
		uf : req.body.uf,
		cidade : req.body.cidade,
		dataNacimento : req.body.nascimento,
		hash : crypto.randomBytes(25).toString('hex')
	});
	Usuario.adicionarUsuario(novoUsuario, (err,usuario) => {
		if(err){
			res.json({success:false,msg:'Falha ao cadastrar usuário!'});
		} else {
			let email = new mail.Email(usuario.email,
														'Tunts - Ativação',
														'Para ativar sua conta acesse o link: http://localhost:4200/ativar;u='+usuario.login+';key='+usuario.hash);
														// +req.protocol + '://' + req.get('host') + req.originalUrl+
			mail.enviarEmail(email, function(err,r){
				if(err){
					console.log(err);
					res.json({success:false,msg:'Falha ao cadastrar!'});
				} else {
					res.json({success:true,msg:'Conta criada com sucesso! Verifique seu e-mail para ativação!'});
				}
			});

		}
	});
});
router.post('/ativar', (req,res,next) => {
	let usuario = new Usuario({
		login : req.body.login,
		hash : req.body.hash
	});
	Usuario.ativarUsuario(usuario, (err,usuario) => {
		if(err){
			res.json({success:false,msg:'Link inválido!'});
		} else {
			res.json({success:true,msg:'Conta ativada com sucesso!'});
		}
	});
});
router.post('/recuperar', (req,res,next) => {
	let usuaroRec = new Usuario({
		email : req.body.email
	});
	Usuario.recuperarSenha(usuaroRec, (err,usuario) => {
		if(err){
			res.json({success:false,msg:'Usuário não cadastrado!'});
		} else {
			res.json({success:true,msg:'Senha redefinida, verifique seu e-mail!'});
		}
	});
});
router.post('/reenviar', (req,res,next) => {
	let usuario = new Usuario({
		email : req.body.email
	});
	Usuario.enviarAtivacao(usuario, (err,usuario) => {
		if(err){
			res.json({success:false,msg:usuario});
		} else {
			res.json({success:true,msg:'Confirmação reenviada, verifique seu e-mail!'});
		}
	});
});
router.put('/', (req,res,next) => {
	let usuarioAlterado = new Usuario({
		email : req.body.email,
		senha : req.body.senha,
		uf : req.body.uf,
		cidade : req.body.cidade,
		login : req.body.login
	});
	Usuario.alterarUsuario(usuarioAlterado, (err,usuario) => {

		if(err){
			console.log(err);
			if(err.code == 11000){
				return res.json({success:false,msg:'E-mail já cadastrado!'});
			} else {
				return res.json({success:false,msg:'Falha ao alterar dados!'});
			}
		} else {
			return res.json({success:true,msg:'Dados alterados com sucesso!'});
		}
	});
});
router.post('/anunciante', (req,res,next) => {
	let usuarioAlterado = new Usuario({
		telefone : req.body.telefone,
		cnpj : req.body.cnpj,
		razao : req.body.razao,
		login : req.body.login
	});
	Usuario.registrarAnunciante(usuarioAlterado, (err,usuario) => {

		if(err){
			console.log(err);
			if(err.code == 11000){
				return res.json({success:false,msg:'CNPJ já cadastrado!'});
			} else {
				return res.json({success:false,msg:'Falha ao alterar dados!'});
			}
		} else {
			let novoAnunciante = new Anunciante({
				fornecedor : usuario.login,
				telefone : usuario.telefone,
				titulo : usuario.razao
			});
			Anunciante.adicionarPagina(novoAnunciante,(err,anun)=>{
				if(err) console.log(err);
			});
			return res.json({success:true,msg:'Registro realizado com sucesso!'});
		}
	});
});
router.post('/autenticar', (req,res,next) => {
	const login = req.body.login;
	const senha = req.body.senha;

	Usuario.usuarioPorNome(login, (err,usuario) => {
		if(err) throw err;
		if(!usuario){
			return res.json({success:false,msg:"Usuário não encontrado!"});
		}
		if(!usuario.situacao){
			return res.json({success:false,msg:"Conta não ativada, verifique seu e-mail!"});
		}
		Usuario.compararSenha(senha, usuario.senha, (err,isMatch) => {
			if(err) throw err;
			if(isMatch){
				const token = jwt.sign(usuario,config.secret,{
					expiresIn : 36000
				});

				res.json({
					success : true,
					msg: "Usuário autenticado!",
					token: 'JWT '+token,
					usuario: {
						id : usuario._id,
						nome : usuario.nome,
						login : usuario.login,
						email : usuario.email,
						uf : usuario.uf,
						cidade : usuario.cidade,
						cpf : usuario.cpf
					}
				});
			} else {
				return res.json({success : false, msg : "Senha incorreta!"});
			}
		});
	})
});

router.get('/perfil', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

router.get('/estados', (req,res,next) => {
	Estado.buscarEstados( (err,estados) =>{
		if(err) throw err;
		return res.json({estados});
	});
});

module.exports = router;
