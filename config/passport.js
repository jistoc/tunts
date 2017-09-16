const EstrategiaAutenticacao = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Usuario = require('../models/usuario');
const config = require('../config/banco');

module.exports = function(passport){
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
	opts.secretOrKey = config.secret;
	passport.use(new EstrategiaAutenticacao(opts, (jwt_payload, done) => {
    Usuario.usuarioPorId(jwt_payload.data._id, (err,usuario) => {
      if(err){
        return done(err, false);
      }

      if(usuario){
        return done(null, usuario);
      } else {
        return done(null, false);
      }
    });
  }));
}
