const { Kafka } = require('kafkajs')

const UserConsumer = require('./UserConsumer')
const UserService = require('../Services/UserService')
const UserRepository = require('../Repositories/UserRepository')
const UserModel = require('../Models/UserModel')

const kafka = new Kafka({
  clientId: 'app-30975',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'local-30975' })

const initConsumers = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'createUser' })

  const consumersFn = {
    'createUser': async (message) => {
      const userRepository = UserRepository.getInstance(UserModel)
      const userService = UserService.getInstance(userRepository)
      const userConsumer = UserConsumer.getInstance(userService)

      const data = JSON.parse(message)

      await userConsumer.createUser(data)
    }
  }

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const messageValue = message.value.toString()
      
      console.log({ topic, messageValue })

      const consumerFn = consumersFn[topic]

      if (consumerFn) {
        await consumerFn(messageValue)
      }
    }
  })
}

module.exports = initConsumers
