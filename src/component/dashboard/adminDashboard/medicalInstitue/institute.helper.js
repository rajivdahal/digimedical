const validateInstitute = ( values, isEdit = false ) =>{
    let errors = {};
    let decimalREGEX = /^\d*\.?\d*$/;

    if (!values.name) {
        errors.name = 'Medical Institute Name is Required!'
    }

    if(!decimalREGEX.test(values.contactNo)){
        errors.contactNo = "Contact Number must be a number!";
    }
    
    if (("" + values.contactNo).includes('-')) {
        errors.contactNo = "Contact Number can't be Negative!"
    }

    if (!values.contactNo) {
        errors.contactNo = "Contact Number is required!"
    }

    if (!values.city) {
        errors.city = 'City is required!'
    }
    if (!values.street) {
        errors.street = 'Street is required!'
    }

    return errors;   
}

export {validateInstitute};