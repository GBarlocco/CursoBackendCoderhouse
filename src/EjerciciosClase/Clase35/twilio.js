const twilio = require(`twilio`);

const accountSid = 'AC3ea9961d8a1dda88009f5e64942dcc05'
const authToken = 'b26ea369b7ec94e5441a11e7daa06343'

const client = twilio(accountSid, authToken);

const sendSMS = async () => {
    try {
        const message = await client.messages.create({
            body: `Hola desde twilio SMS`,
            from: `+14057251618`,
            to: `+59894057052`
        })
        console.log(message);
    } catch (error) {
        console.log(error);
    }
}

sendSMS();