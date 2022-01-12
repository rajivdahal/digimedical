import { useState } from "react"
import Createdoctor from "../../adminDashboard/doctorData/doctor.component"

const AddDoctor = (props) => {
    return (
        <div>
            <Createdoctor isHospital {...props}></Createdoctor>

        </div>
    )
}

export default AddDoctor