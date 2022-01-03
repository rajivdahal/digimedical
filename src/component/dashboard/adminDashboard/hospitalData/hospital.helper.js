const validateHospital = ( values, isEdit = false ) =>{
    let errors = {};
    let decimalREGEX = /^\d*\.?\d*$/;

    if (!values.firstName) {
        errors.firstName = 'Required!'
    }
    if (!values.lastName) {
        errors.lastName = 'Required!'
    }

    if (!values.mobileNumber) {
        errors.mobileNumber = "Required!"
    }

    if(!decimalREGEX.test(values.mobileNumber)){
        errors.mobileNumber = "Must be a number!";
    }
    
    else if (("" + values.mobileNumber).length != 10) {
        errors.mobileNumber = "Mobile Number must be of 10 digits!"
    }
    else if (("" + values.mobileNumber).includes('-')) {
        errors.mobileNumber = "Mobile Number can't be Negative!"
    }

    if (!values.prefix) {
        errors.prefix = 'Required!'
    }

    if (!values.nmcNumber) {
        errors.nmcNumber = 'Required!'
    }

    if(!decimalREGEX.test(values.nmcNumber)){
        errors.nmcNumber = "Must be a number";
    }

    if (!values.specialist) {
        errors.specialist = 'Required!'
    }

    if (!values.description) {
        errors.description = 'Required!'
    }

    if (!values.licensedDate) {
        errors.licensedDate = 'Required!'
    }

    if (!values.email) {
        errors.email = "Email is required!"
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = "Invalid email format!"
    }

    if(!isEdit){
        if (values.password.length < 8) {
            errors.password = "Password must be greater than 8 digits!"
        }
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(values.password)) {
            errors.password = "Password should at least be 8 characters of one uppercase ,one lowercase and one special character!"
        }
        if (!values.password) {
            errors.password = "Password must not be empty!"
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Please confirm your Password!"
        }
        if (values.confirmPassword != values.password) {
            errors.confirmPassword = "Password doesn't match!"
        }
    }
    // console.log(errors);
    return errors;   
}

export {validateHospital};