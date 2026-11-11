const bcrypt = require('bcrypt')
const userService = require('../services/userService')

async function criarUsuario(req, res, next) {
  try {
    const { nome, email, senha, tipo } = req.body

    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: 'Nome, email e senha são obrigatórios',
      })
    }

    if (!email.includes('@')) {
      return res.status(400).json({
        erro: 'O email deve ser válido e conter @.',
      })
    }
    if (senha.length < 6) {
      return res.status(400).json({
        erro: 'A senha deve ter mais que 6 caracteres',
      })
    }

    const tipoUsuario = tipo || 'cliente'

    if (tipoUsuario !== 'cliente' && tipoUsuario !== 'admin') {
      return res.status(400).json({
        erro: 'Tipo de usuário inválido.',
      })
    }

    const usuarioExistente = await userService.buscarUsuarioPorEmail(email)

    if (usuarioExistente) {
      return res.status(400).json({
        erro: 'Este email já está cadastrado',
      })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const novoUsuario = await userService.criarUsuario({
      nome,
      email,
      senha: senhaCriptografada,
      tipo: tipoUsuario,
    })

    res.status(201).json({
      id: novoUsuario._id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      tipo: novoUsuario.tipo,
    })
  } catch (error) {
    next(error)
  }
}

const User = require("../models/User");

async function listarUsuarios(req, res) {
  try {
    const usuarios = await User.find()
      .select("-senha");

    return res.status(200).json({
      mensagem: "Usuários listados com sucesso.",
      total: usuarios.length,
      usuarios
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao listar usuários."
    });
  }
}

module.exports = {
  criarUsuario,
  listarUsuarios
}
