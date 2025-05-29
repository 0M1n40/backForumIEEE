const router = require("express").Router();
const respostaController = require("../controller/respostaController");
const authMiddleware = require("../middleware/auth");

router.post("/api/respostas", authMiddleware, respostaController.handleCreateResposta);
router.get("/api/respostas/:duvida_id", respostaController.handleReadRespostas);
router.patch("/api/respostas/:id", authMiddleware, respostaController.handleUpdateResposta);
router.delete("/api/respostas/:id", authMiddleware, respostaController.handleDeleteResposta);

module.exports = router;

