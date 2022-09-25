const pessoaModel = require('../models/pessoa');

module.exports.getUsuario = async pessoaId => {
    const pessoa = await pessoaModel.findById(pessoaId);
    return pessoa.usuario;
}