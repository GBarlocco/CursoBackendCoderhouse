const userLogin = (req, res) => {
    const { userName } = req.body;

    return res.redirect(`/chat?userName=${userName}`);
};

module.exports = {
    userLogin,
};
