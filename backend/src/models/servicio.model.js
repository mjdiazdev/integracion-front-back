const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Servicio = sequelize.define('Servicio', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(150), allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'servicios',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Servicio;
