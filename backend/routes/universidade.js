const express = require('express');
const router = express.Router();
const universidadeController = require('../controllers/universidade');
const authUtils = require('../utils/auth');

router.post('/universidade', authUtils.validateToken, universidadeController.criarUniversidade);
router.post('/curso', authUtils.validateToken, universidadeController.criarCurso);
router.get('/curso', universidadeController.pegarCursosUniversidade);
router.get('/universidade', universidadeController.pegarUniversidades);
router.get('/universidade/:id', universidadeController.pegarUniversidade)

module.exports = router;