import "./prescribefooter.component.css"
import React from 'react'

export default function Prescribefooter(props) {
    console.log("submit footer",props)

    return (
        <div>
            <div className="prescription-footer">
                <div className="footer-wrapper">
                    <div className="footer-button" onClick={props.handleCancel}> Cancel</div>
                    <button className="footer-button next-button" type="submit"> {props.label}</button>
                </div>
            </div>

        </div>
    )
}
