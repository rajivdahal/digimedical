import { REGEX } from "../../../../constants/constants";
import { getRequiredError } from "../../../../utils/errorHelper";

const validateService = (values,digiService) => {
    let errors = {};
    if (!values.serviceName) {
        errors.serviceName = getRequiredError("Service Name")
    }
    if (!values.serviceDescription) {
        errors.serviceDescription = getRequiredError("Service Description")
    }
    if (!digiService) {
        if (!values.serviceName) {
            errors.serviceName = getRequiredError("Service Name")
        }
        if (!values.serviceDescription) {
            errors.serviceDescription = getRequiredError("Service Description")
        }
        if (!values.price) {
            errors.price = getRequiredError("Price")
        }
        // if (!values.serviceImg) {
        //     errors.serviceImg = getRequiredError("Image")
        // }
        // if (!values.iconImg) {
        //     errors.iconImg = getRequiredError("Image")
        // }
        console.log(errors)
        return errors;
    }
    return errors;

}

export { validateService };