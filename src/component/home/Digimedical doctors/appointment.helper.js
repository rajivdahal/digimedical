import { REGEX } from "../../../constants/constants";

const validateAppointment = (values, isLogin) => {
    let errors = {};

    if(isLogin){
        if (!values.appointmentTime) {
            errors.appointmentTime = 'Appointment Time is required!'
        }
    
        if (!values.appointmentDate) {
            errors.appointmentDate = 'Appointment Date is required!'
        }
        return errors;
    }
    
    if (!values.firstName) {
        errors.firstName = 'First Name is required!'
    }
    if (!values.lastName) {
        errors.lastName = 'Last Name is required!'
    }

    if (!REGEX.DECIMAL.test(values.mobileNumber)) {
        errors.mobileNumber = "Mobile Number must be a number!";
    }

    if ((values.mobileNumber).length != 10) {
        errors.mobileNumber = "Mobile Number must be of 10 digits!"
    }
    if ((values.mobileNumber).includes('-')) {
        errors.mobileNumber = "Mobile Number can't be Negative!"
    }
    if (!values.mobileNumber) {
        errors.mobileNumber = "Mobile Number is required!"
    }

    if (!values.appointmentTime) {
        errors.appointmentTime = 'Appointment Time is required!'
    }

    if (!values.appointmentDate) {
        errors.appointmentDate = 'Appointment Date is required!'
    }

    if (!REGEX.EMAIL.test(values.email)) {
        errors.email = "Invalid email format!"
    }

    if (!values.email) {
        errors.email = "Email is required!"
    }
    return errors;
}

export { validateAppointment };