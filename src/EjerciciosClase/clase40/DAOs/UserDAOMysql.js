const db = require('../db/mysql')

class UserDAOMysql {
  constructor () {
    this.db = db()
    this.table = 'users'
  }

  async getAll () {
    return this.db.from(this.table).select('*')
  }
}

module.exports = UserDAOMysql