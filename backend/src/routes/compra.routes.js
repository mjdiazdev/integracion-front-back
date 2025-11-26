// routes/compra.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/compra.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);

// (Opcional) agregar PUT/DELETE más adelante

module.exports = router;
