import { REGEX } from "../../../../constants/constants";

const validateCorporate = ( values, isEdit = false ) =>{
    let errors = {};

    if (!values.name) {
        errors.name = 'Corporate Name is required!'
    }

    if(!REGEX.DECIMAL.test(values.contactNumber)){
        errors.contactNumber = "Contact Number must be a number!";
    }

    if (("" + values.contactNumber).includes('-')) {
        errors.contactNumber = "Contact Number can't be Negative!"
    }

    if (!values.contactNumber) {
        errors.contactNumber = "Contact Number is required!"
    }

    if(!REGEX.DECIMAL.test(values.mobileNum)){
        errors.mobileNum = "Mobile Number must be a number!";
    }

    if (("" + values.mobileNum).includes('-')) {
        errors.mobileNum = "Mobile Number can't be Negative!"
    }

    if (! values.mobileNum) {
        errors.mobileNum = "Mobile Number is required!"
    }

    if (!values.address) {
        errors.address = 'Address is required!'
    }

    if (!values.establishDate) {
        errors.establishDate = 'Established Date is required!'
    }

    if(!REGEX.DECIMAL.test(values.panNumber)){
        errors.panNumber = "PAN Number must be a number!";
    }

    if (!values.panNumber) {
        errors.panNumber = 'PAN Number is required!'
    }

    if (!values.contactPersonName) {
        errors.contactPersonName = "Contact person Name is required!"
    }

    if (!values.selectedType.value) {
        errors.selectedType = "Corporate Type is required"
    }

    if(!isEdit){
        
        if (!REGEX.EMAIL.test(values.email)) {
            errors.email = "Invalid email format!"
        }
        if (!values.email) {
            errors.email = "Email is required!"
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