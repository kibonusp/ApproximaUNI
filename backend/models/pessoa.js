const mongoose = require('mongoose')

const pessoaSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    descricao: String
})

module.exports = mongoose.model('pessoa', pessoaSchema);