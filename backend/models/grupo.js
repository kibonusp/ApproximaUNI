const mongoose = require('mongoose');

const grupoSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true,
        unique: true
    },
    nome:  {
        type: String,
        required: true
    },
    universidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'universidade',
        required: true
    }
});

grupoSchema.index({
    nome: 1,
    universidade: 1,
}, {
    unique: true,
});

module.exports = mongoose.model('grupo', grupoSchema);