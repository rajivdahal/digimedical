import { useState } from "react"
import Createdoctor from "../../adminDashboard/doctorData/doctor.component"
import DoctorTable from "../../adminDashboard/doctorData/doctor.table"

const HospitalDoctor = (props) => {
    return (
        <div>

            {/* <Createdoctor isHospital></Createdoctor> */}
            <DoctorTable isHospital></DoctorTable>
        </div>
    )
}

export default HospitalDoctor