/* eslint-disable */
const UserService = require('../../Services/UserService')

test('get users', async () => {
  const userRepositoryMock = {
    getAll: () => {
      return [
        {
          name: 'Iram',
          email: 'iram@mail.com'
        },
        {
          name: 'David',
          email: 'david@mail.com'
        }
      ]
    }
  }

  const userService = new UserService(userRepositoryMock)

  const users = await userService.getAll()

  expect(users.length).toBe(2)
})
