import React from "react"

import { ColorPicker } from "react-color-palette";
import "react-color-palette/css";
const ColorSettingsPage = ({color , setColor})=>{

    const mq = window.matchMedia("(max-width: 735px)");
    return <div className="color-picker">
        <ColorPicker color={color} onChange={setColor} hideAlpha={true} hideInput={mq.matches ? [true,false ,false] : false}/>
    </div>
}
export default ColorSettingsPage;