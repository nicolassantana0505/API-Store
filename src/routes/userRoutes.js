const express = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post ("/usuarios", userController.criarUsuario);
router.get("/usuarios", authMiddleware, adminMiddleware, userController.listarUsuarios);


module.exports = router;