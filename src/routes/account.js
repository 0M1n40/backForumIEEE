const router = require("express").Router();
const { authenticate } = require("../middleware/auth.js");
const User = require("../models/User.js");

router.put("/perfil/nome", authenticate, async (req, res) => {
  const userId = req.user.id;

  const { name } = req.body;

  // Validação simples para garantir que o nome não está vazio
  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "O nome não pode estar vazio." });
  }

  try {
    const updatedUser = await User.update(userId, { name: name.trim() });

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar o nome do perfil:", error);
    res.status(500).json({ message: "Erro interno ao atualizar o perfil." });
  }
});

// hello world route
router.get("/", (req, res) => {
  res.json({ message: "Rotas de Conta" });
});

module.exports = router;
