// creo el schema y modelo

const { Schema, model } = require(`mongoose`);
const userSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    lastname: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
});

const userModel = model(`User`, userSchema);

module.exports = userModel;