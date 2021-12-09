import {Mainheader}  from "./mainheader/Mainheader.component"
import { Topheader } from "./topheader/Topheader.component"

export const Header = () => {
    return (
        <>
            <Topheader></Topheader>
            <Mainheader></Mainheader>
        </>
    )
}