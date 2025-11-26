const express = require('express');
const router = express.Router();
const gastoCtrl = require('../controllers/gasto.controller');

router.post('/', gastoCtrl.registrar);

module.exports = router;
