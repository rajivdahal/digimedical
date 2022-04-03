import { REGEX } from "../../../../constants/constants";

const validateCorporatePackage = ( values, isEdit = false ) =>{
    let errors = {};

    if (! values.toDate) {
        errors.toDate = "To Date is required!"
    }

    if (!values.fromDate) {
        errors.fromDate = 'From Date is required!'
    }

    if(!REGEX.DECIMAL.test(values.freeBooking)){
        errors.freeBooking = "Free Booking must be a number!";
    }

    if (!values.freeBooking) {
        errors.freeBooking = 'Free Booking is required!'
    }
    if (!values.selectedCorporate.value) {
        errors.selectedCorporate = "Corporate Name is required"
    }

    if (!values.selectedPackage.value) {
        errors.selectedPackage = "Corporate Package is required"
    }
    console.log(errors)
    return errors;   
}

export {validateCorporatePackage};