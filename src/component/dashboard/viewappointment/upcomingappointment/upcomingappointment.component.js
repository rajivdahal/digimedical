import { Commonupcomingappointment } from "../../userdashboard/commonupcomingappointment/commonupcomingappointment.component"
export const Upcomingappointment = (props) => {
  console.log("props in parent>.",props)
   
    return (
        <>
          <Commonupcomingappointment isactionavailable={true}  isexportavailable={true} issearchavailable={true} props={props.props} fromdoctorcomponent={props.fromdoctorcomponent}></Commonupcomingappointment>
        </>
    )
}