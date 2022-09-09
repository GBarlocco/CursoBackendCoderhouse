class BaseRepository {
  constructor (model) {
    this.model = model
  }

  async getAll () {
    return this.model.find()
  }

  async create (entity) {
    return this.model.create(entity)
  }
}

module.exports = BaseRepository
