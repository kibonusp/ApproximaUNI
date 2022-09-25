const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario');

module.exports.validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).send("Cheque se a Bearer Authentication está correta.");
    
    jwt.verify(token, process.env['ACCESS_SECRET'], (err, docs) => {
        if (err)
            return res.status(403).send("Token inválido.");

        req.sub = docs.id;
        next();
    });
};

module.exports.getUserID = token => {
    return jwt.verify(token, process.env['ACCESS_SECRET']).id;
};

module.exports.isAdmin = id => {
    const usuario = usuarioModel.findById(id);
    if (usuario.cargo !== 'ADMIN')
        return false
    return true
}