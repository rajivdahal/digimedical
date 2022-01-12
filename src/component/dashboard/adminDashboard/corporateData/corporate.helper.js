import { REGEX } from "../../../../constants/constants";

const validateCorporate = ( values, isEdit = false ) =>{
    let errors = {};

    if (!values.name) {
        errors.name = 'Required!'
    }

    if (!values.contactNumber) {
        errors.contactNumber = "Required!"
    }

    if(!REGEX.DECIMAL.test(values.contactNumber)){
        errors.contactNumber = "Must be a number!";
    }

    else if (("" + values.contactNumber).includes('-')) {
        errors.contactNumber = "Contact Number can't be Negative!"
    }

    if (!values.address) {
        errors.address = 'Required!'
    }

    if (!values.establishDate) {
        errors.establishDate = 'Required!'
    }
    if (!values.panNumber) {
        errors.panNumber = 'Required!'
    }

    if(!REGEX.DECIMAL.test(values.panNumber)){
        errors.panNumber = "Must be a number";
    }

    if (!values.personName) {
        errors.personName = "Contact person name is required!"
    }

    if(!isEdit){
        if (!values.email) {
            errors.email = "Email is required!"
        }
        else if (!REGEX.EMAIL.test(values.email)) {
            errors.email = "Invalid email format!"
        }
        if (values.password.length < 8) {
            errors.password = "Password must be greater than 8 digits!"
        }
        if (!REGEX.PASSWORD.test(values.password)) {
            errors.password = "Password should at least be 8 characters of one uppercase ,one lowercase and one special character!"
        }
        if (!values.password) {
            errors.password = "Password must not be empty!"
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm Password must not be empty!"
        }
        if (values.confirmPassword != values.password) {
            errors.confirmPassword = "Password doesn't match!"
        }
    }
    

    // console.log(errors);
    return errors;   
}

export {validateCorporate};