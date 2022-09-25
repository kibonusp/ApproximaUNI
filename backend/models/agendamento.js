const mongoose = require('mongoose');

const agendamentoSchema = mongoose.Schema({
    voluntario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'voluntario',
        required: true
    },
    estudante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'estudante',
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    horaInicio: {
        type: Date,
        required: true
    },
    horaFim: {
        type: Date,
        required: true
    }
})

agendamentoSchema.index({
    voluntario: 1,
    estudante: 1,
    data: 1
}, {
    unique: true,
});

module.exports = mongoose.model('agendamento', agendamentoSchema);