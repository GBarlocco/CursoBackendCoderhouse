const UserDAOMongo = require('../DAOs/UserDAOMongo')
const UserDAOMysql = require('../DAOs/UserDAOMysql')

const storageMapper = {
  mysql: () => new UserDAOMysql(),
  mongo: () => new UserDAOMongo()
}

module.exports = storage => {
  const storageDAOFn =  storageMapper[storage] || storageMapper['mongo']
  const dao = storageDAOFn()
  return dao
}