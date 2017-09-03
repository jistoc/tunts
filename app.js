// iniciado modulos
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/banco');
const morgan = require('morgan');


//mongoose / banco
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
const usuario = require('./routes/usuario');
const mail = require('./routes/mail');
const anunciante = require('./routes/anunciante');
//definindo porta
const port = process.env.PORT || 3000;

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

// logger
app.use(morgan('dev'));

//outras rotas
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname,'public/index.html'));
});

//iniciando aplicação
app.listen(port, () => {
	console.log("Iniciado na porta "+port);
});
