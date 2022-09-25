const universidadeModel = require('../models/universidade');
const cursoModel = require('../models/curso')
const authUtils = require('../utils/auth')

module.exports.criarUniversidade = async (req, res) => {
    try {
        if (authUtils.isAdmin(req.sub))
            return res.status(403).send("Only admins can access this endpoint.")
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
        if (authUtils.isAdmin(req.sub))
            return res.status(403).send("Only admins can access this endpoint.")
        const curso = new cursoModel(req.body);
        const cursoSalvo = await curso.save();
        return res.status(200).send(cursoSalvo);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}