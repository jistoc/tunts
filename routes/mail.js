const express = require('express');
const router = express.Router();
const MailController = require('../controllers/mail');


router.post('/enviar', MailController.enviar);

module.exports = router;
