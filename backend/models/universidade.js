const mongoose = require('mongoose')

const universidadeSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    publica: {
        type: Boolean,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    }
});

universidadeSchema.index({
    nome: 1,
    cidade: 1,
}, {
    unique: true,
});

module.exports = mongoose.model('universidade', universidadeSchema);