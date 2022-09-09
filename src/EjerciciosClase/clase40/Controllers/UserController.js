const loggerFn = require('../utils/logger')

class UserController {
  constructor (service) {
    this.service = service
    this.logger = loggerFn()
  }

  async getAll (req, res) {
    try {
      const items = await this.service.getAll()
      this.logger.info(`Usuarios retornados`)
      return res.json(items)
    } catch (e) {
      console.log(e)
      return res.status(500).json({
        error: e.message
      })
    }
  }

  async create (req, res) {
    const data = req.body

    try {
      const userCreated = await this.service.create(data)
      return res.status(201).json(userCreated)
    } catch (e) {
      console.log(e)
      return res.status(500).json({
        error: e.message
      })
    }
  }
}

module.exports = UserController
