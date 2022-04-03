import React from 'react'
import { Viewappointment } from '../../../viewappointment/Viewappointment.component'

export default function Viewcorporateappointment(props) {
    return (
        <>    
        <Viewappointment fromcorporatecomponent={true} props={props}></Viewappointment>
        </>
    )
}
