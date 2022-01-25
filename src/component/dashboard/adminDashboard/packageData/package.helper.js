const validatePackage = ( values, isEdit = false ) =>{
    let errors = {};
    let decimalREGEX = /^\d*\.?\d*$/;

    if (!values.packageName) {
        errors.packageName = 'Required!'
    }

    if (!values.price) {
        errors.price = "Required!"
    }

    // if(!decimalREGEX.test(values.price&&values.launchingOffer&&values.labDiscount)){
    //     errors.price = "Must be a number!";
    // }

    if (!values.launchingOffer) {
        errors.launchingOffer = 'Required!'
    }
    if (!values.labDiscount) {
        errors.labDiscount = 'Required!'
    }

    return errors;   
}

export {validatePackage};