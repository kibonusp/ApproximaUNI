const mongoose = require('mongoose');

const cursoSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    universidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'universidade',
        required: true
    }
});

cursoSchema.index({
    nome: 1,
    universidade: 1,
}, {
    unique: true,
});

module.exports = mongoose.model('curso', cursoSchema);