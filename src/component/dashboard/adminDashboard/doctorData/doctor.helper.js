import { REGEX } from "../../../../constants/constants";

const validateDoctor = ( values, isEdit = false,isHospital=false ) => {
    let errors = {};
    // let decimalREGEX = /^\d*\.?\d*$/;

    if (!values.firstName) {
        errors.firstName = 'Required!'
    }
    if (!values.lastName) {
        errors.lastName = 'Required!'
    }

    if (!values.mobileNumber) {
        errors.mobileNumber = "Required!"
    }

    if(!REGEX.DECIMAL.test(values.mobileNumber)){
        errors.mobileNumber = "Must be a number!";
    }
    
    if(("" + values.mobileNumber).length != 10) {
        errors.mobileNumber = "Mobile Number must be of 10 digits!"
    }
    if (("" + values.mobileNumber).includes('-')) {
        errors.mobileNumber = "Mobile Number can't be Negative!"
    }

    if (!values.prefix) {
        errors.prefix = 'Required!'
    }

    if (!values.nmcNumber) {
        errors.nmcNumber = 'Required!'
    }

    if(!REGEX.DECIMAL.test(values.nmcNumber)){
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

    // if(!isHospital){
    //     if (!values.availableDays) {
    //         errors.availableDays = 'Required!'
    //     }
    
    //     if (!values.startTime) {
    //         errors.startTime = 'Required!'
    //     }
    
    //     if (!values.endTime) {
    //         errors.endTime = 'Required!'
    //     }
    // }

    if(!isEdit){
        if (!values.email) {
            errors.email = "Email is required!"
        }
        if (!REGEX.EMAIL.test(values.email)) {
            errors.email = "Invalid email format!"
        }

        // if (values.password.length < 8) {
        //     errors.password = "Password must be greater than 8 digits!"
        // }
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
    // console.log(errors);
    return errors;   
}

export {validateDoctor};