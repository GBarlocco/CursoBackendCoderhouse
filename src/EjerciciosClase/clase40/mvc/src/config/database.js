module.exports = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  fn: config => {
    return {
      host: config.DB_HOST,
      user: config.DB_USER,
      pass: config.DB_PASS,
      port: config.DB_PORT || 27017,
      name: config.DB_NAME
    }
  }
}
