const twilio = require(`twilio`);

const ACCOUNT_SID = `AC3ea9961d8a1dda88009f5e64942dcc05`;
const AUTH_TOKEN = `b26ea369b7ec94e5441a11e7daa06343`;
const PHONE_NUMBER_WHATSAPP = `whatsapp:+14155238886`;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendWhatsApp = async (body, from, to) => {
    try {
        const message = await client.messages.create({
            body: body,
            from: from,
            to: to
            //`whatsapp:+59894057052`
        })
        console.log(message);

    } catch (e) {
        console.error(e.message);
    }

}

module.exports = sendWhatsApp;