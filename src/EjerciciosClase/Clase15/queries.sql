-- Listar DB
SHOW DATABASES;

-- Crear DB
CREATE DATABASE ecommerce;

-- Usar DB
USE ecommerce;

-- Listar tablas
SHOW TABLES;

-- Crear tabla
CREATE TABLE Productos (
    id INT NOT NULL auto_increment,
    name VARCHAR(30),
    price FLOAT,
    description VARCHAR(255),
    stock INT,
    PRIMARY KEY (id)
);

CREATE TABLE Categorias(
    id INT NOT NULL auto_increment,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

-- Detalle de una tabla
DESCRIBE productos;

-- Insertar información en una tabla
INSERT INTO Productos(name, price, description, stock) VALUES ("Producto1", 20, "Producto numero 1", 100);

-- Visualizar todos los datos de una tabla:
SELECT * FROM Productos;

-- Visualizar determinados datos:
SELECT name,stock FROM Productos;

-- Insertar columna en tabla existente y agregar la llave foranea
ALTER TABLE Productos
ADD COLUMN categoria_id INT NULL,
ADD FOREIGN KEY (categoria_id) REFERENCES categorias(id);