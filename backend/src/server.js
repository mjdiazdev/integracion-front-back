const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const compraRoutes = require('./routes/compra.routes');
const gastoRoutes = require('./routes/gasto.routes');
const libroDiarioRoutes = require('./routes/libroDiario.routes');
const productoRoutes = require('./routes/producto.routes');

require('./models'); // carga models

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/compras', compraRoutes);
app.use('/api/gastos', gastoRoutes);
app.use('/api/libro-diario', libroDiarioRoutes);
app.use('/api/productos', productoRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  } catch (err) {
    console.error('No se pudo conectar a la base de datos:', err);
  }
}

start();
