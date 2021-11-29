import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader"
import { useState } from "react";
// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;
const Submitbtn = (props) => {
    let [color, setColor] = useState("#cc0033");
    const enabledLabel = props.enabledLabel
    const isSubmitting = props.isSubmitting
    const content = isSubmitting
        ?<div>
            <PropagateLoader color={color}  loading={isSubmitting}  size={15} />
        </div>
        :
        <button className="btn login-btn mb-3" type="submit"  >{enabledLabel}</button>
    return content
}
export default Submitbtn