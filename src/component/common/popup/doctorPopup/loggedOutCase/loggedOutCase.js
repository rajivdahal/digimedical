import React from 'react'

export default function LoggedOutCase(props){
  console.log("props.propsareeeee",props.props)
  return (
    <div className="doc-pop-main">
      <div className="doc-pop-inner">
        <div className="doc-pop-cont">
          <div className="doc-close-but">
            {" "}
            <button
              className="doc-close-butt"
              onClick={() => props.props.setTrigger(false)}
            >
              <span id="doc-popup-cross">
                <i class="fas fa-times"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
        </div>

  )
}
