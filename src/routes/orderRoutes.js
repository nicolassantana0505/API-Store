const express = require("express");

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/pedidos", authMiddleware, orderController.criarPedido);

router.get("/meus-pedidos", authMiddleware, orderController.listarMeusPedidos);

router.get("/pedidos/:id", authMiddleware, orderController.buscarPedidoPorId);

router.patch("/pedidos/:id/status", authMiddleware, adminMiddleware, orderController.atualizarStatusPedido);

module.exports = router;