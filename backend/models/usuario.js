const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    senha: String,
    cargo: {
        type: String,
        required: true,
        enum: ['ADMIN', 'ESTUDANTE', 'VOLUNTARIO', 'GRUPO'],
        default: 'ESTUDANTE'
    }
})

module.exports = mongoose.model('usuario', usuarioSchema);