const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Proveedor = sequelize.define('Proveedor', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(150), allowNull: false },
  telefono: DataTypes.STRING(50),
  direccion: DataTypes.STRING(255)
}, {
  tableName: 'proveedores',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Proveedor;
