import React from 'react'
import { Viewappointment } from '../../viewappointment/Viewappointment.component'

export default function Viewdoctorappointment(props) {
    console.log("props in viewdoctor appointment is",props)
    return (
        <>    
        <Viewappointment fromdoctorcomponent={true} props={props}></Viewappointment>
        </>
    )
}
