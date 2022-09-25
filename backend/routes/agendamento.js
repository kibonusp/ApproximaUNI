const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamento');
const authUtils = require('../utils/auth');

router.post('/agendamento', authUtils.validateToken, agendamentoController.criarAgendamento);
router.post('/disponibilidade', authUtils.validateToken, agendamentoController.criarDisponibilidade);
router.get('/agendamento/estudante/:id', authUtils.validateToken, agendamentoController.getEstudanteAgendamentos);
router.get('/agendamento/voluntario/:id', authUtils.validateToken, agendamentoController.getVoluntarioAgendamentos);

module.exports = router;