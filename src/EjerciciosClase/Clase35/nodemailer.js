// https://ethereal.email/messages
// concepcion.lang@ethereal.email --> correo aleatorio.
// XvTcaWbTGxP5ZNG7jm

// run: node nodemailer.js

const { createTransport } = require(`nodemailer`);

const TEST_MAIL = `concepcion.lang@ethereal.email`;
const TEST_PASS = `XvTcaWbTGxP5ZNG7jm`;

const transporter = createTransport({
    host: `smtp.ethereal.email`,
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: TEST_PASS
    }
});

const mailOptions = {
    from: TEST_MAIL,
    to: TEST_MAIL,
    subject: `Aviso`,
    html: `
        <h1 style="color:blue;">
        Prueba desde NodeJS
        </h1>
    `
};

const sendEmail = async () => {
    try {
        const response = await transporter.sendMail(mailOptions);
        console.log(response);

    } catch (e) {
        console.error(e);
    }
}

sendEmail();

