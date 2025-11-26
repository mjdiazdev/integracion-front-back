const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CuentaContable = require('./cuentaContable.model');

const MovimientoContable = sequelize.define(
  'MovimientoContable',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    cuenta_contable_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    monto: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },

    tipo: {
      type: DataTypes.ENUM('debe', 'haber'),
      allowNull: false
    },

    movimiento_type: {
      type: DataTypes.STRING,
      allowNull: false
    },

    movimiento_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },

    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'movimientos_contables',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

// RELACIÓN
MovimientoContable.belongsTo(CuentaContable, {
  foreignKey: 'cuenta_contable_id',
  as: 'cuenta'
});

module.exports = MovimientoContable;
