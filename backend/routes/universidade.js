const express = require('express');
const router = express.Router();
const universidadeController = require('../controllers/universidade');
const authUtils = require('../utils/auth');

router.post('/universidade', authUtils.validateToken, universidadeController.criarUniversidade);
router.post('/curso', authUtils.validateToken, universidadeController.criarCurso);

module.exports = router;