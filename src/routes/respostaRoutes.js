const express = require('express');
const router = express.Router();

const {
  handleCreateResposta,
  handleReadRespostas,
  handleUpdateResposta,
  handleDeleteResposta
} = require('../controller/respostaController');

router.post('/', handleCreateResposta);
router.get('/', handleReadRespostas);
router.get('/:id', handleReadRespostas);
router.put('/:id', handleUpdateResposta);
router.delete('/:id', handleDeleteResposta);

module.exports = router;

