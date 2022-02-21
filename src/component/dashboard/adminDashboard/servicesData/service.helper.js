import { REGEX } from "../../../../constants/constants";
import { getRequiredError } from "../../../../utils/errorHelper";

const validateService = (values, isEdit = false) => {

    let errors = {};
    if (!values.serviceName) {
        errors.serviceName = getRequiredError("Service Name")
    }
    if (!values.serviceDescription) {
        errors.serviceDescription = getRequiredError("Service Description")
    }
    return errors;

}

export { validateService };