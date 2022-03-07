import { REGEX } from "../../../../constants/constants";
import { getRequiredError } from "../../../../utils/errorHelper";

const validateNewService = (values, isEdit = false) => {
    let errors = {};
    if (!values.serviceName) {
        errors.serviceName = getRequiredError("Service Name")
    }
    if (!values.serviceDescription) {
        errors.serviceDescription = getRequiredError("Service Description")
    }
    if (!values.price) {
        errors.price = getRequiredError("Price")
    }

    if (!isEdit) {
        console.log(isEdit)

        if (!values.serviceImg) {
            errors.serviceImg = getRequiredError("Image")
        }
        if (!values.iconImg) {
            errors.iconImg = getRequiredError("Image")
        }
    }
    return errors;

}

export { validateNewService };