const User = require("../models/User");

async function buscarUsuarioPorEmail(email) {
    const usuario = await User.findOne({ email });

    return usuario;
}

async function criarUsuario(dados) {
    const novoUsuario = await User.create(dados);

    return novoUsuario;
}

module.exports = {
    buscarUsuarioPorEmail,
    criarUsuario
};