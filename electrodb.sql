-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-11-2025 a las 20:51:09
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `electrodb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clasificaciones_contables`
--

CREATE TABLE `clasificaciones_contables` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clasificaciones_contables`
--

INSERT INTO `clasificaciones_contables` (`id`, `nombre`, `descripcion`, `created_at`, `updated_at`) VALUES
(1, 'Circulante', 'Activo o pasivo a corto plazo', '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(2, 'No circulante', 'Activo o pasivo a largo plazo', '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(3, 'Tangible', 'Activo físico', '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(4, 'Intangible', 'Activo no físico', '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(5, 'Operativo', 'Relacionado a la operación del negocio', '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(6, 'No operativo', 'Fuera de la operación principal', '2025-11-25 01:11:11', '2025-11-25 01:11:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `proveedor_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `total` decimal(12,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `created_at`, `updated_at`) VALUES
(4, 1, '2025-01-15', '100.00', '2025-11-25 22:04:16', '2025-11-25 22:04:16'),
(5, 1, '2025-01-15', '100.00', '2025-11-25 22:04:56', '2025-11-25 22:04:56'),
(6, 1, '2025-01-15', '100.00', '2025-11-25 23:23:25', '2025-11-25 23:23:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentas_contables`
--

CREATE TABLE `cuentas_contables` (
  `id` int(11) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `tipo_cuenta_id` int(11) NOT NULL,
  `clasificacion_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuentas_contables`
--

INSERT INTO `cuentas_contables` (`id`, `codigo`, `nombre`, `tipo_cuenta_id`, `clasificacion_id`, `created_at`, `updated_at`) VALUES
(1, '1.1.01', 'Caja', 1, 1, '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(2, '1.1.02', 'Banco', 1, 1, '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(3, '1.1.03', 'Inventario de Productos', 1, 1, '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(4, '2.1.01', 'Cuentas por Pagar', 2, 1, '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(5, '3.1.01', 'Capital Social', 3, 2, '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(6, '4.1.01', 'Ventas', 4, 5, '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(7, '5.1.01', 'Compras', 5, 5, '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(8, '5.1.03', 'Gastos', 5, 5, '2025-11-26 00:45:40', '2025-11-26 00:46:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compras`
--

CREATE TABLE `detalle_compras` (
  `id` int(11) NOT NULL,
  `compra_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(12,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_compras`
--

INSERT INTO `detalle_compras` (`id`, `compra_id`, `producto_id`, `cantidad`, `precio_unitario`, `created_at`, `updated_at`) VALUES
(3, 4, 1, 1, '50.00', '2025-11-25 22:04:16', '2025-11-25 22:04:16'),
(4, 4, 2, 2, '25.00', '2025-11-25 22:04:16', '2025-11-25 22:04:16'),
(5, 5, 1, 1, '50.00', '2025-11-25 22:04:56', '2025-11-25 22:04:56'),
(6, 5, 2, 2, '25.00', '2025-11-25 22:04:56', '2025-11-25 22:04:56'),
(7, 6, 1, 1, '50.00', '2025-11-25 23:23:26', '2025-11-25 23:23:26'),
(8, 6, 2, 2, '25.00', '2025-11-25 23:23:26', '2025-11-25 23:23:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ventas`
--

CREATE TABLE `detalle_ventas` (
  `id` int(11) NOT NULL,
  `venta_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(12,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos`
--

CREATE TABLE `gastos` (
  `id` int(11) NOT NULL,
  `servicio_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `monto` decimal(12,2) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gastos`
--

INSERT INTO `gastos` (`id`, `servicio_id`, `fecha`, `monto`, `descripcion`, `created_at`, `updated_at`) VALUES
(2, 1, '2025-11-25', '78.50', 'Pago mensual de electricidad', '2025-11-26 00:46:50', '2025-11-26 00:46:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos_contables`
--

CREATE TABLE `movimientos_contables` (
  `id` int(11) NOT NULL,
  `cuenta_contable_id` int(11) NOT NULL,
  `monto` decimal(12,2) NOT NULL,
  `tipo` enum('debe','haber') NOT NULL,
  `movimiento_type` varchar(50) DEFAULT NULL,
  `movimiento_id` int(11) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movimientos_contables`
--

INSERT INTO `movimientos_contables` (`id`, `cuenta_contable_id`, `monto`, `tipo`, `movimiento_type`, `movimiento_id`, `descripcion`, `created_at`, `updated_at`, `fecha`) VALUES
(1, 3, '100.00', 'debe', 'Compra', 4, 'Compra #4 - Inventario', '2025-11-25 22:04:16', '2025-11-25 22:04:16', '2025-11-25'),
(2, 1, '100.00', 'haber', 'Compra', 4, 'Compra #4 - Pago', '2025-11-25 22:04:16', '2025-11-25 22:04:16', '2025-11-25'),
(3, 3, '100.00', 'debe', 'Compra', 5, 'Compra #5 - Inventario', '2025-11-25 22:04:56', '2025-11-25 22:04:56', '2025-11-25'),
(4, 1, '100.00', 'haber', 'Compra', 5, 'Compra #5 - Pago', '2025-11-25 22:04:56', '2025-11-25 22:04:56', '2025-11-25'),
(5, 3, '100.00', 'debe', 'Compra', 6, 'Compra #6 - Inventario', '2025-11-25 23:23:26', '2025-11-25 23:23:26', '2025-11-25'),
(6, 1, '100.00', 'haber', 'Compra', 6, 'Compra #6 - Pago', '2025-11-25 23:23:26', '2025-11-25 23:23:26', '2025-11-25'),
(7, 8, '78.50', 'debe', 'Gasto', 2, 'Gasto por servicio: Electricidad', '2025-11-26 00:46:50', '2025-11-26 00:46:50', '2025-11-25'),
(8, 1, '78.50', 'haber', 'Gasto', 2, 'Pago de gasto por servicio: Electricidad', '2025-11-26 00:46:50', '2025-11-26 00:46:50', '2025-11-25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(12,2) DEFAULT 0.00,
  `stock` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `created_at`, `updated_at`) VALUES
(1, 'Televisor 32\"', 'TV Android', '150.00', 8, '2025-11-25 22:04:14', '2025-11-25 23:23:26'),
(2, 'Aire acondicionado', 'Aire acondicionado', '320.00', 8, '2025-11-25 22:04:14', '2025-11-25 23:23:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `nombre`, `telefono`, `direccion`, `created_at`, `updated_at`) VALUES
(1, 'Jesus Pérez', '04121234567', 'Av los horcones', '2025-11-25 22:01:16', '2025-11-25 22:01:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `descripcion`, `created_at`, `updated_at`) VALUES
(1, 'Electricidad', 'Pago mensual de luz', '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(2, 'Aseo', 'Servicio de limpieza', '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(3, 'Alquiler', 'Pago por alquiler del local', '2025-11-25 01:11:11', '2025-11-25 01:11:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_cuenta_contable`
--

CREATE TABLE `tipos_cuenta_contable` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_cuenta_contable`
--

INSERT INTO `tipos_cuenta_contable` (`id`, `nombre`, `descripcion`, `created_at`, `updated_at`) VALUES
(1, 'Activo', 'Bienes y derechos que posee la empresa', '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(2, 'Pasivo', 'Obligaciones y deudas de la empresa', '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(3, 'Capital', 'Aportes de los socios y utilidades retenidas', '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(4, 'Ingreso', 'Entradas de recursos económicos', '2025-11-25 01:11:11', '2025-11-25 01:11:11'),
(5, 'Egreso', 'Salidas o gastos de recursos económicos', '2025-11-25 01:11:11', '2025-11-25 01:11:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cliente` varchar(150) DEFAULT NULL,
  `total` decimal(12,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clasificaciones_contables`
--
ALTER TABLE `clasificaciones_contables`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proveedor_id` (`proveedor_id`);

--
-- Indices de la tabla `cuentas_contables`
--
ALTER TABLE `cuentas_contables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_cuenta_id` (`tipo_cuenta_id`),
  ADD KEY `clasificacion_id` (`clasificacion_id`);

--
-- Indices de la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `compra_id` (`compra_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `venta_id` (`venta_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `servicio_id` (`servicio_id`);

--
-- Indices de la tabla `movimientos_contables`
--
ALTER TABLE `movimientos_contables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cuenta_contable_id` (`cuenta_contable_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipos_cuenta_contable`
--
ALTER TABLE `tipos_cuenta_contable`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clasificaciones_contables`
--
ALTER TABLE `clasificaciones_contables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cuentas_contables`
--
ALTER TABLE `cuentas_contables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gastos`
--
ALTER TABLE `gastos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `movimientos_contables`
--
ALTER TABLE `movimientos_contables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipos_cuenta_contable`
--
ALTER TABLE `tipos_cuenta_contable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`);

--
-- Filtros para la tabla `cuentas_contables`
--
ALTER TABLE `cuentas_contables`
  ADD CONSTRAINT `cuentas_contables_ibfk_1` FOREIGN KEY (`tipo_cuenta_id`) REFERENCES `tipos_cuenta_contable` (`id`),
  ADD CONSTRAINT `cuentas_contables_ibfk_2` FOREIGN KEY (`clasificacion_id`) REFERENCES `clasificaciones_contables` (`id`);

--
-- Filtros para la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  ADD CONSTRAINT `detalle_compras_ibfk_1` FOREIGN KEY (`compra_id`) REFERENCES `compras` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_compras_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD CONSTRAINT `detalle_ventas_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_ventas_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD CONSTRAINT `gastos_ibfk_1` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`);

--
-- Filtros para la tabla `movimientos_contables`
--
ALTER TABLE `movimientos_contables`
  ADD CONSTRAINT `movimientos_contables_ibfk_1` FOREIGN KEY (`cuenta_contable_id`) REFERENCES `cuentas_contables` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
