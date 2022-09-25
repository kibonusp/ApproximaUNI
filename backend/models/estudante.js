const mongoose = require('mongoose');

const estudanteSchema = mongoose.Schema({
    pessoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pessoa',
        unique: true,
        required: true
    },
    escola: String,
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'curso'
    }
})

module.exports = mongoose.model('estudante', estudanteSchema);