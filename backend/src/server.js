const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to connect to DB:', err);
  }
}

start();
