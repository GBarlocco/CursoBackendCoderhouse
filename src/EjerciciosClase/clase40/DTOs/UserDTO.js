class UserDTO {
  constructor (user) {
    this.name = user.name
    this.lastname = user.lastname
    this.email = user.email
  }
}

module.exports = UserDTO