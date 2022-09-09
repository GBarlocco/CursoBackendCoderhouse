const knex = require('./db/mysql')

knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('name', 30)
    table.string('lastname', 30)
    table.string('email', 30)
    table.string('password', 30)
  })
  .then(() => console.log('Tabla de users creada'))
  .catch(err => console.log(`Error: ${err.message}`))