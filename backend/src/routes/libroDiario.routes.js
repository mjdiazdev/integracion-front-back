const express = require('express');
const router = express.Router();
const libroDiarioController = require('../controllers/libroDiario.controller');

router.get('/', libroDiarioController.generarLibroDiario);

module.exports = router;
