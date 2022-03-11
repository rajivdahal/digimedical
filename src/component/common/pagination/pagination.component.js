import React from "react";
import "./pagination.component.css";

export default function Pagination() {
  return (
    <div className="pagination_main">
      <div className="lab_buttons_select">
        <div className="lab_buttons_select1">
          <div className="lab_arrow_left">
            <div>
              <button className="lab_arrow left"></button>
            </div>
          </div>
          <div className="lab_arrow_num1">
            <button id="lab_button_num1">1</button>
          </div>
          <div className="lab_arrow_num">
            <button id="lab_button_num">2</button>
          </div>
          <div className="lab_arrow_num">
            <button id="lab_button_num">3</button>
          </div>
          <div className="lab_arrow_right">
            <div id="lab_arrow_right">
              <button className="lab_arrow_r"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
