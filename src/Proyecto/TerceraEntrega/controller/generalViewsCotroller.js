const homeController = (req, res) => {
    return res.render(`index`);
}

const signupController = (req, res) => {
    return res.render(`signup`);
}

const bienvenidaController = (req, res) => {
    userLog = req.user.username;
    return res.render(`bienvenida`, { userLog });
}

module.exports = {
    homeController,
    signupController,
    bienvenidaController,
};