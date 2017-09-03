const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');


module.exports.Email = function(destinatario,assunto,mensagem){
    this.destinatario = destinatario;
    this.assunto = assunto;
    this.mensagem = mensagem;
}
module.exports.enviarEmail = function(info, callback){
	let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'exsm2017@gmail.com',
        pass: 'klapaucius'
    },
		tls: { rejectUnauthorized: false }
	});
  var mailOptions = {
    from : 'Tunts <exsm2017@gmail.com>',
    to : info.destinatario,
    subject : info.assunto,
    text:  info.mensagem
  }

  transporter.sendMail(mailOptions, callback);
}
