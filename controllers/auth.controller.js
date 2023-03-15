function getSignup(req, res){
    res.render('customer/auth/signup');
}

function signup(req, res){
    // TODO
}

function getLogin(req, res){}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup
}