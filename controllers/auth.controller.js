const User = require('../models/user.model');
const authUtil = require('../util/authentication');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');

function getSignup(req, res){
    let sessionData = sessionFlash.getSessionData(req);
    if (!sessionData){
        sessionData = {
            email: '',
            confirmEmail: '',
            password: '',
            fullname: '',
            street: '',
            postal: '',
            city: ''
        }
    }
    res.render('customer/auth/signup', { inputData: sessionData });
}

async function signup(req, res, next){
    const enteredData = {
        email: req.body.email, 
        confirmEmail: req.body['confirm-email'],
        password: req.body.password, 
        fullname: req.body.fullname, 
        street: req.body.street, 
        postal: req.body.postal, 
        city: req.body.city
    }

    if (!validation.userDetailsAreValid(enteredData.email, enteredData.password, enteredData.fullname, 
        enteredData.street, enteredData.postal, enteredData.city) || !validation.emailIsConfirmed(
            enteredData.email, enteredData.confirmEmail
        )) {
        sessionFlash.flashDataToSession(req, {
            errorMessage: 'Please check your input.',
            ...enteredData    
        }, function(){
            res.redirect('/signup');
        });    

        return;
    }    
    
    const user = new User(enteredData.email, enteredData.password, enteredData.fullname, enteredData.street, enteredData.postal, enteredData.city);

    try {
        const existsAlready = await user.existsAlready();
        if (existsAlready){
            sessionFlash.flashDataToSession(req, {
                errorMessage: 'User already exists.',
                ...enteredData
            },()=>{
                res.redirect('/signup');
            } )
            return;
        }
        await user.signup();  
    } catch(error){
        next(error);
        return;
    }      

    res.redirect('/login')
}

function getLogin(req, res){
    let sessionData = sessionFlash.getSessionData(req);
    if (!sessionData) {
        sessionData = {
            email: '',
            password: ''
        }
    }
    res.render('customer/auth/login', { inputData: sessionData });
}

async function login(req, res, next){
    const user = new User(req.body.email, req.body.password);
    let existingUser;
    try {
        existingUser = await user.getUserWithSameEmail();
    } catch(error){
        next(error);
        return;
    }

    const sessionErrorData = {
        errorMessage: 'Invalid credentials.',
        email: user.email,
        password: user.password,
    };

    if (!existingUser){
        sessionFlash.flashDataToSession(req, sessionErrorData,()=>{
            res.redirect('/login');
        });
        return;
    }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

    if(!passwordIsCorrect){
        sessionFlash.flashDataToSession(req, sessionErrorData,()=>{
            res.redirect('/login');
        });
        return;
    }

    authUtil.createUserSession(req, existingUser, function(){
        res.redirect('/');
    });
}

function logout(req, res){
    authUtil.destroyUserAuthSesseion(req);
    res.redirect('/login');
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup,
    login: login,
    logout: logout
}