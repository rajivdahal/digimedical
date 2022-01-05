const validateStaff = ( values, isEdit = false ) =>{
    let errors = {};
    let decimalREGEX = /^\d*\.?\d*$/;
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!values.firstName) {
        errors.firstName = 'Required!'
    }
    if (!values.lastName) {
        errors.lastName = 'Required!'
    }

    if (!values.mobileNumber) {
        errors.mobileNumber = "Required!"
    }

    if(!decimalREGEX.test(values.mobileNumber)){
        errors.mobileNumber = "Must be a number!";
    }
    
    else if (("" + values.mobileNumber).length != 10) {
        errors.mobileNumber = "Mobile Number must be of 10 digits!"
    }
    else if (("" + values.mobileNumber).includes('-')) {
        errors.mobileNumber = "Mobile Number can't be Negative!"
    }

    if (!values.post) {
        errors.post = 'Required!'
    }

    if (!values.wardNo) {
        errors.wardNo = 'Required!'
    }

    if(!decimalREGEX.test(values.wardNo)){
        errors.wardNo = "Must be a number";
    }

    if (!values.streetName) {
        errors.streetName = 'Required!'
    }

    // if (!values.email) {
    //     errors.email = "Email is required!"
    // }
    // else if (!emailRegex.test(values.email)) {
    //     errors.email = "Invalid email format!"
    // }

    // console.log(errors);
    return errors;   
}

export {validateStaff};