
let instance = null

class UserConsumer {
  constructor (service) {
    this.service = service
  }

  async createUser (data) {
    try {
      const userCreated = await this.service.create(data)
      console.log('user created', userCreated)
    } catch (e) {
      console.log(e)
    }
  }

  static getInstance (service) {
    if (instance) {
      console.log('instancia de consumer reutilizada')
      return instance
    }

    console.log('nueva instancia de consumer')
    instance = new UserConsumer(service)

    return instance
  }
}

module.exports = UserConsumer