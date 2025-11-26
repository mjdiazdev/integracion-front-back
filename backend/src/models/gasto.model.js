const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gasto = sequelize.define('Gasto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  servicio_id: { type: DataTypes.INTEGER, allowNull: false },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  monto: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'gastos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Gasto;
