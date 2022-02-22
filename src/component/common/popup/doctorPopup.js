import React from "react";
import "./doctorPopup.css";
function doctorPopup(props) {
  return props.trigger ? (
    <div className="doc-pop-main">
      <div className=".doc-pop-inner">
        <button
          className="doc-close-but"
          onClick={() => props.SetTrigger(false)}
        >
          Close
        </button>
        {props.children}
        <h1>Hello World</h1>
      </div>
    </div>
  ) : (
    ""
  );
}

export default doctorPopup;
