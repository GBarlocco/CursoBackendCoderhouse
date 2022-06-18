- Ver detalle de tablas:
DESCRIBE nombreTabla

- borrar tabla:
DROP TABLE nombreTabla

- ver todas las tablas:
SHOW DATABASES

- Borrar datos de tabla 
DELETE FROM products where (id  < 100)

- ultimo id
SELECT * FROM products WHERE id IN (SELECT MAX(id) FROM products) 