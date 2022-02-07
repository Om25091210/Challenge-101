const valid = (firstname, lastname, email, password, phone_number) => {
    if(!firstname || !lastname || !email || !password || !phone_number)
    return 'Please enter all the required fields.'

    if(!validateEmail(email))
    return 'Invalid email. Please check'

    if(firstname.length < 3)
    return 'Name must be at least 3 characters.'

    if(password.length < 6)
    return 'Password must be at least 6 characters.'

    if(phone_number.length < 10)
    return 'Phone number must be at least 10 characters.'

}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid