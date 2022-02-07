import { REGEX } from "../../../../constants/constants";

const validateDoctor = ( values, isEdit = false,isHospital=false ) => {
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
    
    if(("" + values.mobileNumber).length != 10) {
        errors.mobileNumber = "Mobile Number must be of 10 digits!"
    }
    if (("" + values.mobileNumber).includes('-')) {
        errors.mobileNumber = "Mobile Number can't be Negative!"
    }

    if (!values.mobileNumber) {
        errors.mobileNumber = "Mobile Number is required!"
    }

    if (!values.prefix) {
        errors.prefix = "Prefix is required!"
    }

    if(!REGEX.DECIMAL.test(values.nmcNumber)){
        errors.nmcNumber = "Must be a number";
    }

    if (!values.nmcNumber) {
        errors.nmcNumber = 'NMC Number is Required!'
    }

    if (!values.specialist) {
        errors.specialist = 'Specialist is required!'
    }

    if (!values.description) {
        errors.description = 'Description is required!'
    }

    if (!values.licensedDate) {
        errors.licensedDate = 'Licensed Date is required!'
    }

    // if (!values.doctorServices.value) {
    //     errors.doctorServices = "Service is required!"
    // }

    if(isHospital){
    
        if (!values.startTime) {
            errors.startTime = 'Start Time is required!'
        }
    
        if (!values.endTime) {
            errors.endTime = 'End Time is required!'
        }
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