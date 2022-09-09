let knex = null

module.exports = () => {
  if (knex) {
    return knex
  }

  knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '192.168.64.2',
      user: 'root',
      password: '',
      database: '30975_clase40'
    }
  })

  return knex
}