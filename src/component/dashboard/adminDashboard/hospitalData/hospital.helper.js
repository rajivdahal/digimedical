const validateHospital = ( values, isEdit = false ) =>{
    let errors = {};
    let decimalREGEX = /^\d*\.?\d*$/;

    if (!values.name) {
        errors.name = 'Required!'
    }

    if (!values.description) {
        errors.description = 'Required!'
    }

    if (!values.establishedDate) {
        errors.establishedDate = 'Required!'
    }

    if (!values.panNo) {
        errors.panNo = 'Required!'
    }

    if(!decimalREGEX.test(values.panNo)){
        errors.panNo = "Must be a number";
    }

    if (!values.contactNumber) {
        errors.contactNumber = 'Required!'
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

    if (!values.address) {
        errors.address = 'Required!'
    }


    if(!isEdit){
        if (!values.email) {
            errors.email = "Email is required!"
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
            errors.email = "Invalid email format!"
        }
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
    console.log(errors);
    return errors;   
}

export {validateHospital};