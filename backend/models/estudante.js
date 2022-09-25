const mongoose = require('mongoose');

const estudanteSchema = mongoose.Schema({
    pessoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pessoa',
        unique: true,
        required: true
    },
    escola: String
})

module.exports = mongoose.model('estudante', estudanteSchema);