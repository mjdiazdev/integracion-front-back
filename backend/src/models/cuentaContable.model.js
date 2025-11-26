const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CuentaContable = sequelize.define(
  'CuentaContable',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    codigo: { type: DataTypes.STRING, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'cuentas_contables',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

module.exports = CuentaContable;
