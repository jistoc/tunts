// iniciado modulos
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/banco');


//conectando mongo com as configuracoes do arquivo e verificanco conexao
mongoose.Promise = global.Promise;

mongoose.connect(config.database);

mongoose.connection.on('connected', () =>{
	console.log('Conectado ao mongoDb');
});
mongoose.connection.on('err', (err) =>{
	console.log('Falha ao conectar '+err);
});

const app = express();

//definindo arquivos a variaveis
const usuario = require('./router/usuario');
const mail = require('./router/mail');
const anunciante = require('./router/anunciante');
//definindo porta
const port = 3000;

//cors
app.use(cors());
//pasta estatica
app.use(express.static(path.join(__dirname,'public')));

//bodyparser
app.use(bodyParser.json());

//passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//definindo rotas para outros arquivos
app.use('/usuario', usuario);
app.use('/mail', mail);
app.use('/anunciante', anunciante);



app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname,'public/index.html'));
});

//iniciando
app.listen(port, () => {
	console.log("Iniciado na porta "+port);
});
