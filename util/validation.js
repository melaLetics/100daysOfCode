function userDetailsAreValid(email, password, name, street, postal, city){
    return  userCredentialsAreValid(email, password)
        && !isEmpty(name) && !isEmpty(street) && !isEmpty(postal) && !isEmpty(city);
}

function isEmpty(value){
    return !value || value.trim() === '';
}

function userCredentialsAreValid(email, password){
    return email && email.includes('@') && password && password.trim().length > 5;
}

function emailIsConfirmed(email, confirmedEmail){
    return email === confirmedEmail;
}


module.exports =  {
    userDetailsAreValid: userDetailsAreValid,
    emailIsConfirmed: emailIsConfirmed
}
