const mongoose = require('mongoose');

const eventoSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    dataInicio: {
        type: Date,
        required: true
    },
    dataFim: {
        type: Date,
        required: true
    },
    oferecimento: String,
    descricao: {
        type: String,
        required: true
    },
    universidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'universidade',
        required: true
    }
});

eventoSchema.index({
    nome: 1,
    dataInicio: 1,
    dataFim: 1,
    universidade: 1
}, {
    unique: true,
});

module.exports = mongoose.model('evento', eventoSchema);