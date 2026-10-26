const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/ComentarioController');

router.post('/comentarios', comentarioController.criarComentario);
router.get('/comentarios', comentarioController.obterComentarios);

module.exports = router;