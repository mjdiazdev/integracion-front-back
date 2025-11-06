-- Crear la base de datos y la tabla products
CREATE DATABASE IF NOT EXISTS curso_vue_express CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE curso_vue_express;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Datos de ejemplo
INSERT INTO products (name, price, stock) VALUES
('Remera camiseta', 1999.00, 10),
('Jean azul', 5499.50, 5),
('Zapatillas deportivas', 12999.99, 3);
