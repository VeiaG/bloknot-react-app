import React from "react";


const KnobGroup = ({count, value})=>{
    let knobs=[];
    for(let i=0 ;i<count;i++){
        knobs.push(i===value);
    }
    return (
        <div className="modal__knob-group">
                {
                    knobs.map((knob,index)=>{
                        return (
                            <div key={index} 
                            className={`knob ${knob ? 'knob-active' :''}`}/>
                        )
                    })
                }
        </div>
    )
}
export default KnobGroup;