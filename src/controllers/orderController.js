const mongoose = require("mongoose");
const orderService = require("../services/orderService");
const { orderSchema } = require("../validations/orderValidation");

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.usValid(id);
}

async function criarPedido(req, res, next) {
    try {
        const resultado = orderSchema.safeParse(req.body);

        if(!resultado.success) {
        return res.status(400).json({
            erro: resultado.error.errors[0].message
        });
        }

        const pedido = await orderService.criarPedido(
            req.user.id,
            resultado.data.itens
        );

        res.status(201).json(pedido);
    } catch (error) {
        if (
            error.message === "Produto não encontrado." || 
            error.message.includes("Estoque insuficiente")
        ) {
            return res.status(400).json({
                erro: error.message
            });
        }

        next(error);
    }
}

async function listarMeusPedidos(req, res, next) {
    try {
        const pedidos = await orderService.listarPedidosDoUsuario(req.user.id);

        res.json(pedidos);
    } catch (error) {
        next(error);
    }
}

async function buscarPedidoPorId(req, res, next) {
    try {
        const { id } = req.params;

        if(!isValidObjectsId(id)) {
            return res.status(400).json({
                erro: "ID inválido."
            });
        }

        const pedido = await orderService.buscarPedidoPorId(id, req.user.id, req.user.tipo);

        if(!pedido) {
            return res.status(404).json({
                erro: "Pedido não encontrado"
            });
        }

        res.json(pedido);
    } catch (error) {
        next(error);    
    }
}

async function atualizarStatusPedido(req, res, next) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                erro: "ID inválido"
            });
        }

        const statusPermitidos = ["pendente", "pago", "enviado", "cancelado"];

        if (!statusPermitidos.includes(status)) {
            return res.status(400).json({
                erro: "Status inválido."
            });
        }

        const pedidoAtualizado = await orderService.atualizarStatusPedido(id, status);

        if(!pedidoAtualizado) {
            return res.status(404).json({
                erro: "Pedido não encontrado."
            });
        }

        res.json(pedidoAtualizado);
    } catch (error) {
        next (error);
    }
}

module.exports = {
    criarPedido,
    listarMeusPedidos,
    buscarPedidoPorId,
    atualizarStatusPedido
};
