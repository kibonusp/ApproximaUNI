const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario')

router.post('/cadastro', usuarioController.criarUsuario);
router.post('/login', usuarioController.login)

module.exports = router;