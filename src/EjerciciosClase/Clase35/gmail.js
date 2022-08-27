
const { createTransport } = require(`nodemailer`);

const TEST_MAIL = `gaston.coderhouse.backend@gmail.com`;
const TEST_PASS = `aykxqsxrfpqyhfgv`;

const transporter = createTransport({
    host: `smtp.gmail.com`,
    port: 465,
    auth: {
        user: TEST_MAIL,
        pass: TEST_PASS
    }
});

const mailOptions = {
    from: TEST_MAIL,
    to: `barlocco@hotmail.es`,
    subject: `Aviso`,
    html: `
        <h1 style="color:blue;">
        Prueba desde NodeJS
        </h1>
    `
};

const sendEmail = async (options) => {
    try {
        const response = await transporter.sendMail(options);
        console.log(response);

    } catch (e) {
        console.error(e);
    }
}

sendEmail(mailOptions);

