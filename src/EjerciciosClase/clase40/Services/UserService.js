
let instance = null

class UserService {
  constructor (repository) {
    this.repository = repository
  }

  async getAll () {
    const users = await this.repository.getAll()
    console.log({ users })

    return users
  }

  async create (entity) {
    entity.createdAt = new Date()
    return this.repository.create(entity)
  }

  static getInstance (repository) {
    if (instance) {
      console.log('instancia de servicio reutilizada')
      return instance
    }

    console.log('nueva instancia de servicio')
    instance = new UserService(repository)

    return instance
  }
}

module.exports = UserService
