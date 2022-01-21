import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { httpClient } from "../../../../utils/httpClient";
import MaterialTable from "material-table";
import { Add, Edit, Clear } from "@material-ui/icons";
import Tableicons from "../../../../utils/materialicons";
import { Modal, Button } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import Cliploader from "../../../../utils/clipLoader";
import hospitalApi from "./hospitalServices";

const HospitalTable = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [hospitalID, setHospitalID] = useState("");
  const [hospitalStatus, setHospitalStatus] = useState("");
  const [allHospital, setAllHospital] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllHospital = async () => {
    try {
      let resp = await hospitalApi.getAllHospital();
      if (resp.data.status) {
        let data = resp.data.data;
        setAllHospital(data);
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    getAllHospital();
  }, []);

  const handleAddHospital = () => {
    props.history.push("/dashboard/add-hospital");
  };

  const handleEditHospital = (e, data) => {
    props.history.push("/dashboard/add-hospital", data);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDeactivateHospital = (e, data) => {
    setHospitalStatus(data.isactive);
    setHospitalID(data.id);
    setShowModal(true);
  };

  const changeHospitalStatus = async () => {
    setLoading(true);
    let status = hospitalStatus == true ? false : true;

    try {
      let resp = await hospitalApi.hospitalStatus(status, hospitalID);
      if (resp.data.status) {
        notify.success(resp.data.message);
        setLoading(false);
        getAllHospital();
        handleClose();
      }
    } catch (err) {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <div>
      <Container>
        <MaterialTable
          columns={[
            { title: '#', field: 'tableData.id', render:rowData => rowData.tableData.id+1},
            { title: "Name", field: "name" },
            { title: "PAN Number", field: "panno" },
            { title: "Contact", field: "contactnumber" },
            { title: "Mobile No", field: "mobilenumber" },
            { title: "Description", field: "description" },
            { title: "Address", field: "address" },

            {
              title: "Status",
              field: "activeStatus",
              render: (rowData) =>
                rowData.isactive == true ? (
                  <span style={{ color: "#18af69" }}>Active</span>
                ) : (
                  <span style={{ color: "red" }}>inActive</span>
                ),
            },
          ]}
          data={allHospital}
          title="Hospital Data"
          icons={Tableicons}
          actions={[
            {
              icon: Add,
              tooltip: "Add Hospital",
              isFreeAction: true,
              onClick: () => {
                handleAddHospital();
              },
            },
            {
              icon: Edit,
              tooltip: "Edit Hospital",
              onClick: (e, rowData) => {
                handleEditHospital(e, rowData);
              },
            },
            {
              icon: Clear,
              tooltip: "Change Status",
              onClick: (e, rowData) => {
                handleDeactivateHospital(e, rowData);
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            pageSize: 10,
            filtering: false,
            sorting: true,
            headerStyle: {
              backgroundColor: "#2745F0",
              color: "#FFF",
            },
          }}
        />

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <b>Hospital Status</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you really want to change this hospital status ?
          </Modal.Body>
          <Modal.Footer>
            {loading == true ? (
              <Cliploader isLoading={loading} />
            ) : (
              <div>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="info"
                  style={{ marginLeft: "10px" }}
                  onClick={changeHospitalStatus}
                >
                  Change Status
                </Button>
              </div>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};
export default HospitalTable;
