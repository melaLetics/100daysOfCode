function postIsValid(title, content){
return title && content && title.trim() !== '' && title.trim() !== '';
}

function credentialsAreValid(email, confirmEmail, password) {
    return email && confirmEmail && password && password.trim().length >= 6
        && email === confirmEmail && email.includes('@');
}

module.exports =  {
    postIsValid: postIsValid,
    credentialsAreValid: credentialsAreValid
}