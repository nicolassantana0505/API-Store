const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

async function login(req, res, next) {
    try {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).json({
                erro: "Email e senha são obrigatórios"
            });
        }

        const usuario = await userService.buscarUsuarioPorEmail(email);

        if (!usuario) {
            return res.status(401).json({
                erro: "Email e senha inválidos"
            });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if(!senhaCorreta) {
            return res.status(401).json({
                erro: "Email ou senha inválidos"
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            },
            process.env.JWT_SECRET,
            {
               expiresIn: "1d" 
            }
        );

        res.json({
            mensagem: "Login realizado com sucesso",
            token
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login
};