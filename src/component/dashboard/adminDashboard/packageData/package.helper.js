import { REGEX } from "../../../../constants/constants";
import { getRequiredError } from "../../../../utils/errorHelper";

const validateMembershipPackage = ( values, isEdit = false ) =>{
    let errors = {};
    console.log(values)
    if (!values.packageName) {
        errors.packageName = getRequiredError("Package Name")
    }

    if(!REGEX.DECIMAL.test(values.price)){
        errors.price = "Price must be a number!";
    }

    if (!values.price) {
        errors.price = getRequiredError("Price")
    }

    if (!values.description) {
        errors.description = getRequiredError("Description")
    }

    if (!values.launchingOffer) {
        errors.launchingOffer = getRequiredError("Launching Offer")
    }

    if (!values.labDiscount) {
        errors.labDiscount = getRequiredError("Lab Discount")
    }

    if (!values.selectedPackage.value) {
        errors.selectedPackage = getRequiredError("Master Package Name")
    }

    return errors;   
}

const validateMasterPackage=(values)=>{
    let errors = {};

    if (!values.name) {
        errors.name = getRequiredError("Master Package Name")
    }
    
    if (values.allPurpose.length  < 1) {
        errors.purpose = getRequiredError("Atleast one purpose")
    }

    if (!values.description) {
        errors.description = getRequiredError("Description")
    }
    return errors;
}

const validatePackageDetails=(values)=>{
    let errors = {};

    if (!values.selectedPackage.value) {
        errors.selectedPackage = getRequiredError("Package Name")
    }
    
    if (values.allDetails.length  < 1) {
        errors.details = getRequiredError("Atleast one details")
    }

    return errors;
}

export {validateMembershipPackage,validateMasterPackage,validatePackageDetails};