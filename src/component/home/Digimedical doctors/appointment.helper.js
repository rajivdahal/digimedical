import { REGEX } from "../../../constants/constants";

const validateAppointment = (values) => {
    let errors = {};

    if (!values.firstName) {
        errors.firstName = 'Required!'
    }
    if (!values.lastName) {
        errors.lastName = 'Required!'
    }

    if (!values.mblNumber) {
        errors.mblNumber = "Required!"
    }

    if (!REGEX.DECIMAL.test(values.mblNumber)) {
        errors.mblNumber = "Must be a number!";
    }

    if (("" + values.mblNumber).length != 10) {
        errors.mblNumber = "Mobile Number must be of 10 digits!"
    }
    if (("" + values.mblNumber).includes('-')) {
        errors.mblNumber = "Mobile Number can't be Negative!"
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