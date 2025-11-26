// models/index.js
const Producto = require('./producto.model');
const Proveedor = require('./proveedor.model');
const Compra = require('./compra.model');
const DetalleCompra = require('./detalleCompra.model');
const CuentaContable = require('./cuentaContable.model');
const MovimientoContable = require('./movimientoContable.model');
const Servicio = require('./servicio.model');
const Gasto = require('./gasto.model');

// Asociaciones compras <-> proveedor
Compra.belongsTo(Proveedor, { foreignKey: 'proveedor_id' });
Proveedor.hasMany(Compra, { foreignKey: 'proveedor_id' });

// Compra <-> DetalleCompra
DetalleCompra.belongsTo(Compra, { foreignKey: 'compra_id' });
Compra.hasMany(DetalleCompra, { foreignKey: 'compra_id' });

// DetalleCompra <-> Producto
DetalleCompra.belongsTo(Producto, { foreignKey: 'producto_id' });
Producto.hasMany(DetalleCompra, { foreignKey: 'producto_id' });

// MovimientoContable <-> CuentaContable
MovimientoContable.belongsTo(CuentaContable, { foreignKey: 'cuenta_contable_id' });
CuentaContable.hasMany(MovimientoContable, { foreignKey: 'cuenta_contable_id' });

// Relación: un servicio tiene muchos gastos
Servicio.hasMany(Gasto, { foreignKey: 'servicio_id' });
Gasto.belongsTo(Servicio, { foreignKey: 'servicio_id' });

module.exports = {
  Producto,
  Proveedor,
  Compra,
  DetalleCompra,
  CuentaContable,
  MovimientoContable,
  Gasto,
  Servicio
};
