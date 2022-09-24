const twilio = require(`twilio`);

const dotenv = require(`dotenv`);
dotenv.config();

//no toma process.env
const accountSid = 'AC3ea9961d8a1dda88009f5e64942dcc05'; //ver porque no toma process.env
const authToken = 'b26ea369b7ec94e5441a11e7daa06343'; //ver porque no toma process.env

const client = twilio(accountSid, authToken);

const sendSMS = async (body, from, to) => {
    try {
        const message = await client.messages.create({
            body: body,
            from: from,
            to: to
        })
        console.log(message);
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendSMS;