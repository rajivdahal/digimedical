import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import MaterialTable from 'material-table';
import Tableicons from "../../../../utils/materialicons";
import { Add, Edit, Clear} from "@material-ui/icons";
import { notify } from "../../../../services/notify";
import { Modal, Button} from 'react-bootstrap';
import doctorApi from "./doctor.services";
const DoctorTable = (props) => {

    const [doctors, setDoctors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [doctorId, setDoctorId] = useState("");
    const [doctorStatus, setDoctorStatus] = useState("");
    const [loading, setLoading] = useState(false)
    const  createDoctorPath= {
        "hospital" : "/dashboard/add-doctor",
        "admin" : "/dashboard/create-doctor",
    }
    const handleClose = () => {
        setShowModal(false);
    }

    const getDoctor = async () => {
        setLoading(true)
        try {
            let resp;
            if (props.isHospital) {
                resp = await doctorApi.getHospitalDoctor();
            } else {
                resp = await doctorApi.getAdminDoctor();
            }
            if (resp.data.status) {
                resp.data.data.forEach((item) => {
                    if (item.description) {
                        let splitDesc = item.description.split(" ");

                        if (splitDesc.length < 10) {
                            item.description = item.description
                        } else {
                            let sliceDesc = splitDesc.slice(0, 10);
                            let joinDesc = sliceDesc.join(" ") + " ...";
                            item.description = joinDesc;
                        }
                    }
                })
                setDoctors(resp.data.data)
            }
        }
        catch (err) {
            console.log(err.response)
        }
        setLoading(false)
    }

    useEffect(() => {
        getDoctor();
    }, [])


    const handleDeactivateDoctor = (e, data) => {
        setDoctorStatus(data.status)
        setDoctorId(data.id)
        setShowModal(true)
    }

    const changeDoctorStatus = async () => {
        setLoading(true);
        try {
            let resp = await doctorApi.adminDoctorStatus(doctorId, doctorStatus);
            if (resp.data.status) {
                notify.success(resp.data.message)
                getDoctor();
                handleClose();
            }
        } catch (err) {
            console.log(err.response.data);
            notify.error(err.response.data.message)
            handleClose();
        }
        setLoading(false)
    }

    const handleAddDoctor = () => {
        props.history.push(props.isHospital? createDoctorPath.hospital : createDoctorPath.admin);   

    }
    const handleEditDoctor = (e, data) => {
      props.history.push(props.isHospital ? createDoctorPath.hospital : createDoctorPath.admin,data);   
    }

  return (
    <div>
      <Container>
        {props.isHospital ? (
          <MaterialTable
            data={doctors}
            title="All Doctor Details"
            icons={Tableicons}
            columns={[
              { title: "ID", field: "doctorid" },
              { title: "Prefix", field: "prefix" },
              { title: "Name", field: "doctorname" },
              { title: "Service Name", field: "servicename" },
              { title: "Specialist", field: "specialist" },
              { title: "Mobile Number", field: "mobilenumber" },
              {
                title: "Status",
                field: "doctorstatus",
                render: (rowData) =>
                  rowData.doctorstatus.toString() == "true" ? (
                    <span style={{ color: "#18af69" }}>Active</span>
                  ) : (
                    <span style={{ color: "red" }}>inActive</span>
                  ),
              },
            ]}
            actions={[
              {
                icon: Add,
                tooltip: "Add Doctor",
                isFreeAction: true,
                onClick: () => {
                  handleAddDoctor();
                },
              },
              {
                icon: Edit,
                tooltip: "Edit Service",
                onClick: (e, rowData) => {
                  handleEditDoctor(e, rowData);
                },
              },
              {
                icon: Clear,
                tooltip: "Change Status",
                onClick: (e, rowData) => {
                  handleDeactivateDoctor(e, rowData);
                },
              },
            ]}
            isLoading={loading}
            options={{
              actionsColumnIndex: -1,
              pageSize: 20,
              headerStyle: {
                backgroundColor: "#2745F0",
                color: "#FFF",
              },
            }}
          />
        ) : (
          <MaterialTable
            data={doctors}
            title="All Doctor Details"
            icons={Tableicons}
            columns={[
              { title: "ID", field: "id" },
              { title: "Name", field: "name" },
              { title: "Description", field: "description" },
              { title: "NMC", field: "nmcNo" },
              { title: "Prefix", field: "prefix" },
              {
                title: "Status",
                field: "status",
                render: (rowData) =>
                  rowData.status.toString() == "true" ? (
                    <span style={{ color: "#18af69" }}>Active</span>
                  ) : (
                    <span style={{ color: "red" }}>inActive</span>
                  ),
              },
            ]}
            actions={[
              {
                icon: Add,
                tooltip: "Add Doctor",
                isFreeAction: true,
                onClick: () => {
                  handleAddDoctor();
                },
              },
              {
                icon: Edit,
                tooltip: "Edit Service",
                onClick: (e, rowData) => {
                  handleEditDoctor(e, rowData);
                },
              },
              {
                icon: Clear,
                tooltip: "Change Status",
                onClick: (e, rowData) => {
                  handleDeactivateDoctor(e, rowData);
                },
              },
            ]}
            isLoading={loading}
            options={{
              actionsColumnIndex: -1,
              pageSize: 20,
              headerStyle: {
                backgroundColor: "#2745F0",
                color: "#FFF",
              },
            }}
          />
        )}

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <b>Doctor Status</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you really want to change this doctor status ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="info" onClick={changeDoctorStatus}>
              Change Status
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default DoctorTable;
