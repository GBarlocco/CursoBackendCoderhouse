const bienvenida = (req, res) => {
    userLog = req.user.username;
    res.render(`bienvenida`, { userLog });
}

module.exports = {
    bienvenida,
};

