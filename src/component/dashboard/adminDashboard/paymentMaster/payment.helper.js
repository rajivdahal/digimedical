import { getRequiredError } from "../../../../utils/errorHelper";

const validatePayment = (values, isEdit = false) => {
    let errors = {};
    if (!values.name) {
        errors.name = getRequiredError("Payment Name")
    }

    if (!values.type) {
        errors.type = getRequiredError("Payment Type")
    }
    
    if(!isEdit){
        if (!values.url) {
            errors.url = getRequiredError("URL")
        }
    }
      
    return errors;

}

export { validatePayment};