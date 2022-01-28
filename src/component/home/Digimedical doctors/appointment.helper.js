import { REGEX } from "../../../constants/constants";

const validateAppointment = (values, isLogin) => {
    let errors = {};

    if(isLogin){
        if (!values.appointmentTime) {
            errors.appointmentTime = 'Required!'
        }
    
        if (!values.appointmentDate) {
            errors.appointmentDate = 'Required!'
        }
        return errors;
    }
    
    if (!values.firstName) {
        errors.firstName = 'Required!'
    }
    if (!values.lastName) {
        errors.lastName = 'Required!'
    }

    if (!values.mobileNumber) {
        errors.mobileNumber = "Required!"
    }

    if (!REGEX.DECIMAL.test(values.mobileNumber)) {
        errors.mobileNumber = "Must be a number!";
    }

    if (("" + values.mobileNumber).length != 10) {
        errors.mobileNumber = "Mobile Number must be of 10 digits!"
    }
    if (("" + values.mobileNumber).includes('-')) {
        errors.mobileNumber = "Mobile Number can't be Negative!"
    }

    if (!values.appointmentTime) {
        errors.appointmentTime = 'Required!'
    }

    if (!values.appointmentDate) {
        errors.appointmentDate = 'Required!'
    }

    if (!values.email) {
        errors.email = "Email is required!"
    }

    if (!REGEX.EMAIL.test(values.email)) {
        errors.email = "Invalid email format!"
    }


    console.log(errors);
    return errors;
}

export { validateAppointment };