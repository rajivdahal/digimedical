import React from 'react'
import { Viewappointment } from '../../viewappointment/Viewappointment.component'

export default function Viewdoctorappointment(props) {
    return (
        <>
        <Viewappointment fromdoctorcomponent={true} props={props}></Viewappointment>
        </>
    )
}
