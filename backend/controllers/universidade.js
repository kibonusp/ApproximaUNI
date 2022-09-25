const universidadeModel = require('../models/universidade');
const cursoModel = require('../models/curso')
const authUtils = require('../utils/auth')

module.exports.criarUniversidade = async (req, res) => {
    try {
        if (authUtils.isNotAdmin(req.sub))
            return res.status(403).send("Apenas admins podem acessar este endpoint.")
        const universidade = new universidadeModel(req.body);
        const universidadeSalvo = await universidade.save();
        return res.status(200).send(universidadeSalvo);
    }
    catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports.criarCurso = async (req, res) => {
    try {
        if (authUtils.isNotAdmin(req.sub))
            return res.status(403).send("Apenas admins podem acessar este endpoint.")
        const curso = new cursoModel(req.body);
        const cursoSalvo = await curso.save();
        return res.status(200).send(cursoSalvo);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports.pegarUniversidades = async (req, res) => {
    try {
        const universidades = await universidadeModel.find({})
        return res.status(200).send(universidades);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports.pegarCursosUniversidade = async (req, res) => {
    try {
        const cursos = await cursoModel.find({universidade: req.body.universidade});
        
        return res.status(200).send(cursos.map(el => el.nome));
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

module.exports.pegarUniversidade = async (req, res) => {
    try {
        const universidade = await universidadeModel.findById(req.params.id);
        return res.status(200).send(universidade);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}