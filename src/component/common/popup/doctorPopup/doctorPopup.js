import React, { useState } from "react";
import "./doctorPopup.css";
import LoggedInCase from "./loggedInCase/loggedInCase";
import LoggedOutCase from "./loggedOutCase/loggedOutCase";

function DoctorPopup(props) {
  console.log("props before",props)
  const [docPopup, SetDocPopup] = useState(false);
  return <>
  {
props.trigger ?
  localStorage.getItem("dm-access_token")?
  <LoggedInCase props={props}></LoggedInCase>:
  <LoggedOutCase props={props}></LoggedOutCase>
:null
  }
  </>

}

export default DoctorPopup;
