
const knex = require('./db/mysql')

const users = [
  {
    "name": "api user",
    "lastname": "api",
    "email": "api@mail.com",
    "password": "qwerty"
  }
 ]

 
 knex('users')
  .insert(users)
  .then(() => console.log('Usuarios insertadas'))
  .catch(err => console.log(`Error: ${err.message}`))
  .finally(() => knex.destroy())