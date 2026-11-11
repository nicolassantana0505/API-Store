const express = require("express");

const productController = require("../controllers/productController");

const verificarAdmin = require("../middlewares/adminMiddleware");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router(); 

router.get("/produtos", productController.listarProdutos);

router.get("/produtos/:id", productController.buscarProdutoPorId);

router.post("/produtos", authMiddleware, verificarAdmin, productController.criarProduto);

router.put("/produtos/:id",authMiddleware, productController.atualizarProduto);

router.delete("/produtos/:id",authMiddleware, verificarAdmin, productController.deletarProduto);                                                  //verificarAdmin

module.exports = router;