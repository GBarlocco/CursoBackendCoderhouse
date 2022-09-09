const { fn } = require('../../config/database')

/* global expect */
test('test config value', () => {
  const database = fn({
    DB_PORT: 5000
  })
  expect(database.port).toBe(5000)
})

test('test default value', () => {
  const database = fn({})
  expect(database.port).toBe(27017)
})
