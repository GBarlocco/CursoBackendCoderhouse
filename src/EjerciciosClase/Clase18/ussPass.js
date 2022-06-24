//use admin;

db.createUser({ user: 'lector', pwd: '123456', roles: [{ role: 'read', db: 'empresa' }] }); // creo un usuario que tiene rol de escritura en la DB "empresa"

db.createUser({ user: 'escritor', pwd: '123456', roles: [{ role: 'readWrite', db: 'empresa' }] }); // perfil lectura/escritura

