import { useState } from "react"
import Createdoctor from "../adminDashboard/doctorData/doctor.component"

const AddDoctor=(props)=>{
    return (
        <div>
            <div className="container-fluid page-body-wrapper">
                  <div className="main-panel">
                    <div className="content-wrapper">
                  
                        <Createdoctor isHospital></Createdoctor>
                        </div>
                        </div>
                    </div>
        </div>
    )
}

export default AddDoctor