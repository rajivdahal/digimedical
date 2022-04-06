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

  return (
      <Sidebar></Sidebar>
  );
}
