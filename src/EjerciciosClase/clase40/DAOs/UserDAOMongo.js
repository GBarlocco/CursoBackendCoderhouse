const userModel = require('../Models/UserModel')

class UserDAOMongo {
  constructor () {
    this.model = userModel
  }

  async getAll() {
    return this.model.find()
  }
}

module.exports = UserDAOMongo