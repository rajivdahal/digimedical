import { REGEX } from "../../../../constants/constants";

const validateCorporateUser = (values) => {
    let errors = {};

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

    else if (("" + values.mobileNumber).length != 10) {
        errors.mobileNumber = "Mobile Number must be of 10 digits!"
    }
    else if (("" + values.mobileNumber).includes('-')) {
        errors.mobileNumber = "Mobile Number can't be Negative!"
    }

    if (!values.address) {
        errors.address = 'Required!'
    }


    if (!values.email) {
        errors.email = "Email is required!"
    }
    if (!REGEX.EMAIL.test(values.email)) {
        errors.email = "Invalid email format!"
    }

    return errors;
}

export { validateCorporateUser };