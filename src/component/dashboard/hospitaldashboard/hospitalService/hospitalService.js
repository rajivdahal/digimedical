import Createservices from "../../adminDashboard/servicesData/services.component";

function HospitalService(props) {
    return <>
        <Createservices isHospital {...props}></Createservices>
    </>
}
export default HospitalService;