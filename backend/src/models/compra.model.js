const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Compra = sequelize.define('Compra', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  proveedor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false
  }
}, {
  tableName: 'compras',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',

});

module.exports = Compra;
