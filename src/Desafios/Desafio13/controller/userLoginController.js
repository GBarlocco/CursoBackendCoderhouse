const userLogin = (req, res) => {
    const { aliasName } = req.body;

    return res.redirect(`/chat?aliasName=${aliasName}`);
};

module.exports = {
    userLogin,
};
