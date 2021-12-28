import React from "react";

function lab_popup(props) {
  return props.trigger ? (
    <div className="lab_pops">
      <div className="lab_pops_inner">
        <button className="clost-btn-lab">Back</button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default lab_popup;
