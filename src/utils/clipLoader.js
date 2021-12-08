import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Cliploader =(props)=>{
    let [color, setColor] = useState("#000");
    const isLoading = props.isLoading

    return (
        <div>
            <ClipLoader color={color} loading={isLoading} size={20} />

        </div>
    )
}
export default Cliploader