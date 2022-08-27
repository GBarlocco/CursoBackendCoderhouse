const signupFormController = (req, res) => res.render(`signup`);

const loginFormController = (req, res) => res.render(`loginSession`);

const logoutController = (req, res) => {
    if (req.user) {
        userLogout = req.user.username;
        res.render(`logout`, { userLogout });
        req.session.destroy(err => {
            if (!err) {
                console.log(`ok`);
            } else {
                console.log(`error`);
            }
        });
    }
}

const profileController = (req, res) => {
    //userLog = req.user.username;
    userLog = req.user;
    res.render(`profile`, { userLog })
};

module.exports = {
    signupFormController,
    loginFormController,
    logoutController,
    profileController
};