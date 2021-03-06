import React from 'react';
import MaterialTable from "material-table";
import Tableicons from "../../../../utils/materialicons";
import VisibilityIcon from '@mui/icons-material/Visibility';
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export function CommonMedicalreportTable(props) {
  const data = props.medicalData;

  const handleShowImage=(e,data)=>{
    console.log(data);
    window.open(REACT_APP_BASE_URL +"medical-records/download/"+data.id , "_blank")
  }
  return <div className="material-table">
    <p id="medical_table_head">Report</p>
    <MaterialTable
      data={data}
      title="Previous Details"
      icons={Tableicons}
      columns={[
        { title: "Category", field: "category" },
        { title: "Doctor Name", field: "doctorname" },
        { title: "Hospital Name", field: "hospitalname" },
        { title: "CheckUp Date", field: "visiteddate" },
        { title: "FollowUp Date", field: "followupdate" },
        { title: "Description/Value", field: "description", },
      ]}

      actions={[
        {
          icon: VisibilityIcon,
          tooltip: 'View',
          onClick: (e, rowData) => { handleShowImage(e, rowData) }
        },
      ]}
      // actions={[
      //   (rowData) => {
      //     return {
      //       icon: "bug_report",
      //       tooltip: "View",
      //       disabled: rowData.category === "General information",
      //       // hidden: rowData.status === "active",
      //       onClick: (event, rowData) =>
      //           viewPopUp(rowData)
      //     };
      //   }
      // ]}
      options={{
        actionsColumnIndex: -1,
        pageSize: 5,
        filtering: false,
        sorting: true,
        headerStyle: {
          backgroundColor: "#2745F0",
          color: "#FFF",
        },
      }}
    />
  </div>
}


export function CommonUtilityreportTable(props) {
  const bodyCheckUp = props.bodyCheckUp
  return <div className="material-table">
    <p id="medical_table_head">Report</p>
    <MaterialTable
      data={bodyCheckUp}
      title="Previous Details"
      icons={Tableicons}
      columns={[
        { title: "Category", field: "name" },
        { title: "CheckUp Date", field: "visiteddate" },
        { title: "Description/Value", field: "description", },
      ]}
     
      options={{
        actionsColumnIndex: -1,
        pageSize: 5,
        filtering: false,
        sorting: true,
        headerStyle: {
          backgroundColor: "#2745F0",
          color: "#FFF",
        },
      }}
    />
  </div>;
}
