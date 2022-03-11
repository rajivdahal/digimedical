import { REGEX } from "../../../../constants/constants";
import { getRequiredError } from "../../../../utils/errorHelper";

const validateHospital = ( values, isEdit = false ) =>{
    let errors = {};

    if (!values.name) {
        errors.name = 'Hospital Name is required!'
    }

    if (!values.description) {
        errors.description = 'Description is required!'
    }

    if (!values.establishedDate) {
        errors.establishedDate = 'Established Date is required!'
    }

    if(!REGEX.DECIMAL.test(values.panNo)){
        errors.panNo = "PAN Number  must be a number";
    }

    if (!values.panNo) {
        errors.panNo = 'PAN Number is required!'
    }

    if (!values.contactNumber) {
        errors.contactNumber = 'Contact Number is required!'
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

    // if (!values.servicePrice) {
    //     errors.servicePrice = getRequiredError("Price")
    // }

    if (!values.address) {
        errors.address = 'Address is required!'
    }
    if (!values.mobileNumber) {
        errors.mobileNumber = "Mobile Number is required!"
    }

    // if (!values.hospitalServices.value) {
    //     errors.hospitalServices = getRequiredError("Service Name")
    // }

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
    return errors;   
}

const validateServiceData = (value)=>{

    let errors = {};
    let isValid = true;
    if (!value.serviceID || !value.serviceName) {
        isValid = false;
        errors.serviceID = getRequiredError("Service")
    }

    if(!value.price){
        isValid = false;
        errors.price = getRequiredError("Price");
    }
    return { errors,isValid };   

}

export {validateHospital,validateServiceData};