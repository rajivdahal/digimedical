import React from "react";
import "./doctorPopup.css";
function doctorPopup(props) {
  return props.trigger ? <div className="doc-pop-main">doctorPopup</div> : "";
}

export default doctorPopup;
