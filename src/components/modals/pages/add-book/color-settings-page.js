import React from "react"

import { ColorPicker } from "react-color-palette";
import "react-color-palette/css";
const ColorSettingsPage = ({color , setColor})=>{
    return <div className="color-picker">
        <ColorPicker color={color} onChange={setColor} hideAlpha={true} />
    </div>
}
export default ColorSettingsPage;