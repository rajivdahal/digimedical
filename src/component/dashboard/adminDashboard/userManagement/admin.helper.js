import { REGEX } from "../../../../constants/constants";

const validateAdmin = ( values, isEdit = false ) =>{
    let errors = {};

    if (!values.firstName) {
        errors.firstName = 'First Name is required!'
    }
    if (!values.lastName) {
        errors.lastName = 'Last Name is required!'
    }

    if(!REGEX.DECIMAL.test(values.mobileNumber)){
        errors.mobileNumber = "Mobile Number must be a number!";
    }
    
    if (("" + values.mobileNumber).length != 10) {
        errors.mobileNumber = "Mobile Number must be of 10 digits!"
    }
    if (("" + values.mobileNumber).includes('-')) {
        errors.mobileNumber = "Mobile Number can't be Negative!"
    }

    if (!values.mobileNumber) {
        errors.mobileNumber = "Mobile Number is required!"
    }

    if (!values.dob) {
        errors.dob = 'Date Of Birth is required!'
    }
    if (!values.selectedRole.value) {
        errors.selectedRole = "Role is required"
    }

    if(!isEdit){
        if (!values.email) {
            errors.email = "Email is required!"
        }
        if (!REGEX.EMAIL.test(values.email)) {
            errors.email = "Invalid email format!"
        }
        if ((values.password).length < 8) {
            errors.password = "Password must be greater than 8 digits!"
        }
        if (!REGEX.PASSWORD.test(values.password)) {
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
    return errors;   
}

export {validateAdmin};