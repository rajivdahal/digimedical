const validateInstitute = ( values, isEdit = false ) =>{
    let errors = {};
    let decimalREGEX = /^\d*\.?\d*$/;

    if (!values.name) {
        errors.name = 'Required!'
    }

    if (!values.contactNo) {
        errors.contactNo = "Required!"
    }

    if(!decimalREGEX.test(values.contactNo)){
        errors.contactNo = "Must be a number!";
    }
    
    else if (("" + values.contactNo).includes('-')) {
        errors.contactNo = "Contact Number can't be Negative!"
    }

    if (!values.city) {
        errors.city = 'Required!'
    }
    if (!values.street) {
        errors.street = 'Required!'
    }

    return errors;   
}

export {validateInstitute};