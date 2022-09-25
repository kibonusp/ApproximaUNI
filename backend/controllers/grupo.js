const usuarioModel = require('../models/usuario');
const eventoModel = require('../models/evento');
const grupoModel = require('../models/grupo')

module.exports.criarEvento = async (req, res) => {
    try {
        const id = req.sub;

        const grupo = await grupoModel.findOne({usuario: id});

        if (grupo == null)
            throw 'Grupo não existente.'

        const evento = new eventoModel({
            nome: req.body.nome,
            dataInicio: req.body.dataInicio,
            dataFim: req.body.dataFim,
            oferecimento: req.body.oferecimento,
            descricao: req.body.descricao,
            universidade: grupo.universidade
        });
        const eventoSalvo = await evento.save();

        return res.status(200).send(eventoSalvo);
    }
    catch (error) {
        console.log(error);
        if (error == 'Grupo não existente.')
            return res.status(404).send(error)
        return res.status(500).send(error);
    }
}