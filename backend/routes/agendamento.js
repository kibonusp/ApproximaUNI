const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamento');

router.post('/agendamento', agendamentoController.criarAgendamento);
router.post('/disponibilidade', agendamentoController.criarDisponibilidade);

module.exports = router;