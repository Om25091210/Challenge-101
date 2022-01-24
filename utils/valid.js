const valid = (firstname, lastname, email, password) => {
    if(!firstname || !lastname || !email || !password)
    return 'Please enter all the required fields.'

    if(!validateEmail(email))
    return 'Invalid email. Please check'

    if(password.length < 6)
    return 'Password must be at least 6 characters.'


}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid