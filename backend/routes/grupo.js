const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupo');
const authUtils = require('../utils/auth');

router.post('/evento', authUtils.validateToken, grupoController.criarEvento);

module.exports = router;