const usuarioModel = require('../models/usuario');
const pessoaModel = require('../models/pessoa');
const estudanteModel = require('../models/estudante');
const voluntarioModel = require('../models/voluntario');
const cursoModel = require('../models/curso');
const grupoModel = require('../models/grupo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.criarUsuario = async (req, res) => {
    try {
        let cargo = req.body.cargo;

        if (cargo == 'ADMIN')
            throw 'Não pode-se criar um admin por esta rota.';

        const usuario = new usuarioModel({
            email: req.body.email,
            senha: await bcrypt.hash(req.body.senha, 10),
            cargo: req.body.cargo
        });

        const usuarioSalvo = await usuario.save();

        cargo = usuarioSalvo.cargo;

        if (cargo == 'GRUPO') {
            const grupo = new grupoModel({
                usuario: usuarioSalvo._id,
                nome: req.body.nome,
                universidade: req.body.universidade
            })

            const grupoSalvo = await grupo.save();
            return res.status(200).send(grupoSalvo)
        }

        if (cargo == 'ESTUDANTE' || cargo == 'VOLUNTARIO') {
            const pessoa = new pessoaModel({
                usuario: usuarioSalvo._id,
                nome: req.body.nome,
                idade: req.body.idade,
                descricao: req.body.descricao
            })

            const pessoaSalvo = await pessoa.save();

            switch(cargo) {
                case 'ESTUDANTE':
                    const estudante = new estudanteModel({
                        pessoa: pessoaSalvo._id,
                        escola: req.body.escola,
                        curso: req.body.curso
                    })
                    const estudanteSalvo = await estudante.save();
                    return res.status(200).send(estudanteSalvo);

                case 'VOLUNTARIO':
                    
                    if (cursoModel.exists({curso: req.body.curso, universidade: req.body.universidade}) == null)
                        throw new Error(`Curso ${curso} não está disponível nesta universidade.`)
                    
                    const voluntario = new voluntarioModel({
                        pessoa: pessoaSalvo._id,
                        universidade: req.body.universidade,
                        curso: req.body.curso
                    })
                    const voluntarioSalvo = await voluntario.save();
                    return res.status(200).send(voluntarioSalvo);
                
                default:
                    return res.status(200).send(usuarioSalvo);
            }   
        }
    }
    catch(error) {
        const usuario = await usuarioModel.findOne({email: req.body.email});
        await usuarioModel.findOneAndDelete({email: req.body.email});
        if (usuario != null) {
            await pessoaModel.findOneAndDelete({usuario: usuario._id});
            await grupoModel.findOneAndDelete({usuario: usuario._id});
        }
        return res.status(400).send(error)
    }
};

module.exports.login = async (req, res) => {
    try {
        const usuario = await usuarioModel.findOne({email: req.body.email});
        if (usuario) {
            if (await bcrypt.compare(req.body.senha, usuario.senha)) {
                const token = jwt.sign({'id': usuario._id}, process.env['ACCESS_SECRET'], {expiresIn: '5d'});
                return res.status(200).send(token);
            }
        }
        return res.status(404).send("E-mail ou senha incorreto(a).");
    }
    catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).send("Cheque se a Bearer Authentication está correta.");
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403).send("Token inválido.");

        req.sub = user.sub;
        next();
    });
};

function getUserID(token) {
    return jwt.verify(token, process.env['ACCESS_SECRET']).id;
}