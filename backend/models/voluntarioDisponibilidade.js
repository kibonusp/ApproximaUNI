const mongoose = require('mongoose');

const voluntarioDisponibilidadeSchema = mongoose.Schema({
    voluntario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'voluntario',
        required: true
    },
    semana: {
        type: Date,
        required: true
    },
    domingo: [String],
    segunda: [String],
    terca: [String],
    quarta: [String],
    quinta: [String],
    sexta: [String],
    sabado: [String]
});

voluntarioDisponibilidadeSchema.index({
    voluntario: 1,
    semana: 1,
}, {
    unique: true,
});

module.exports = mongoose.model('voluntarioDisponibilidade', voluntarioDisponibilidadeSchema);