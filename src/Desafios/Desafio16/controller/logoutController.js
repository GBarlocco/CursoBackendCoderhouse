const logout = (req, res) => {
    if (req.user) {
        userLogout = req.user.username;
        res.render(`logout`, { userLogout });
        req.session.destroy(err => {
            if (!err) {
                console.log(`ok`)
            } else {
                console.log(`error`)
            }
        });
    }
}

module.exports = {
    logout,
};


