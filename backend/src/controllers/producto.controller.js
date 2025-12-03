// controllers/producto.controller.js
const { Producto } = require('../models');

/**
 * Obtener todos los productos
 */
exports.getAll = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json(productos);
  } catch (err) {
    console.error("Error getAll productos:", err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

/**
 * Obtener producto por ID
 */
exports.getById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    console.error("Error getById producto:", err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

/**
 * Crear un nuevo producto
 * body = {
 *   nombre,
 *   descripcion,
 *   precio,
 *   stock
 * }
 */
exports.create = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || precio == null || stock == null) {
      return res.status(400).json({ error: 'Faltan datos requeridos (nombre, precio, stock)' });
    }

    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock
    });

    res.status(201).json(nuevoProducto);
  } catch (err) {
    console.error("Error crear producto:", err);
    res.status(500).json({ error: 'No se pudo crear el producto' });
  }
};

/**
 * Actualizar un producto existente
 * body puede contener: { nombre, descripcion, precio, stock }
 */
exports.update = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    await producto.update(req.body);

    res.json(producto);
  } catch (err) {
    console.error("Error actualizar producto:", err);
    res.status(500).json({ error: 'No se pudo actualizar el producto' });
  }
};

/**
 * Eliminar un producto
 */
exports.delete = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    await producto.destroy();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error("Error eliminar producto:", err);
    res.status(500).json({ error: 'No se pudo eliminar el producto' });
  }
};

