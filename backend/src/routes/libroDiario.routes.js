const express = require('express');
const router = express.Router();
const controller = require('../controllers/libroDiario.controller');

router.get("/exportar", controller.exportarLibroDiario);

module.exports = router;
