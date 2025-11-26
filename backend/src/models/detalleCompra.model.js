const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetalleCompra = sequelize.define('DetalleCompra', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  compra_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false
  }
}, {
  tableName: 'detalle_compras',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = DetalleCompra;
