const express = require('express');
const router = express.Router();
const AnuncianteController = require('../controllers/anunciante');

router.get('/:fornecedor', AnuncianteController.getAnunciante);
router.post('/', AnuncianteController.setAnunciante)
	  .put('/', AnuncianteController.updateAnunciante);

module.exports = router;
