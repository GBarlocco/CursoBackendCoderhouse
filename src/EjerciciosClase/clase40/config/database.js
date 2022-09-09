module.exports = () => ({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 27017,
  name: process.env.DB_NAME || 'my_db'
})