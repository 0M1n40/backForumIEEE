const router = require('express').Router();
const respostaController = require("../controller/respostaController");
const authMiddleware = require("../middleware/auth");

// Rotas protegidas (requerem autenticação)
router.post("/api/respostas", authMiddleware, respostaController.handleCreateResposta);
router.patch("/api/respostas/:id", authMiddleware, respostaController.handleUpdateResposta);
router.delete("/api/respostas/:id", authMiddleware, respostaController.handleDeleteResposta);

// Rotas públicas
router.get("/api/respostas", respostaController.handleReadRespostas);
router.get("/api/respostas/:id", respostaController.handleReadRespostas); // leitura filtrada por duvida_id

module.exports = router;
