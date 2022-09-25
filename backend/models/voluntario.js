const mongoose = require('mongoose');

const voluntarioSchema = mongoose.Schema({
    pessoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pessoa',
        required: true,
        unique: true
    },
    universidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'universidade',
        required: true
    },
    curso: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('voluntario', voluntarioSchema);