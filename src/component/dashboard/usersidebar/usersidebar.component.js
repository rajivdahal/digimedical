import React from "react";
import { Link } from "react-router-dom";
import "./usersidebar.component.css";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import Sidebar from "./sidebar";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { dashboardClose } from "../../../actions/dashboard.ac";
import OutsideClickHandler from 'react-outside-click-handler';

export default function Usersidebar(props) {
    // redux implementation for the closing of sidebar on mobile view when clicked outside
    let dispatch=useDispatch()
    let sidebarStatus=useSelector((state)=>state.sidebar)
    let setDashboardFalse=bindActionCreators(dashboardClose,dispatch)
    // end of redux implementation for the closing of sidebar on mobile view when clicked outside
  return (
      <Sidebar></Sidebar>
  );
}
