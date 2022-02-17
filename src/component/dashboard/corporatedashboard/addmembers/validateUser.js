import { REGEX } from "../../../../constants/constants";

const validateCorporateUser = (values) => {
    let errors = {};

    if (!values.firstName) {
        errors.firstName = 'First Name is required!'
    }
    if (!values.lastName) {
        errors.lastName = 'Last Name is required!'
    }
    if (!REGEX.DECIMAL.test(values.mobileNumber)) {
        errors.mobileNumber = "Mobile Number must be a number!";
    }
    else if (("" + values.mobileNumber).length != 10) {
        errors.mobileNumber = "Mobile Number must be of 10 digits!"
    }
    else if (("" + values.mobileNumber).includes('-')) {
        errors.mobileNumber = "Mobile Number can't be Negative!"
    }
    if (!values.mobileNumber) {
        errors.mobileNumber = "Mobile Number is required!"
    }
    if (!values.address) {
        errors.address = 'Address is required!'
    }
    if (!REGEX.EMAIL.test(values.email)) {
        errors.email = "Invalid email format!"
    }
    if (!values.email) {
        errors.email = "Email is required!"
    }
    return errors;
}

export { validateCorporateUser };