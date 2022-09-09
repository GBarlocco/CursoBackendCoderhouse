const UserDTO = require('../DTOs/UserDTO')
const UserNameDTO = require('../DTOs/UserNameDTO')
const userDAOFactory = require('../Factories/userDAOFactory')
const BaseRepository = require('./BaseRepository')

let instance = null

class UserRepository {
  constructor () {
    this.dao = userDAOFactory(process.env.STORAGE)
  }

  async getAll () {
    const users =  await this.dao.getAll()

    const usersDTO = users.map(user => new UserDTO(user))

    return usersDTO
  }

  async getNames () {
    const users =  await this.dao.getAll()

    const usersDTO = users.map(user => new UserNameDTO(user))

    return usersDTO
  }

  async create (entity) {
    return this.model.create(entity)
  }

  static getInstance (model) {
    if (instance) {
      console.log('instancia de repositorio reutilizada')
      return instance
    }

    console.log('nueva instancia de repositorio')
    instance = new UserRepository(model)

    return instance
  }
}

module.exports = UserRepository
