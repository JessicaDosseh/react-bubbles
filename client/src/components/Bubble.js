import React, { useState, useEffect } from "react";

const Bubble = ({colors}) => {

    return (
        <div className="bubblesV2Div">
            {colors.map((bubble, id) => {

                let diameter = Math.floor(((Math.random() * 10) + 1)) * 10;
                let leftPosition = 25 + Math.floor(((Math.random() * 10) + 1)) * 5 + "vw";
                let topPosition = 25 + Math.floor(((Math.random() * 10) + 1)) * 5 + "vh";

                let style = { backgroundColor: bubble.code.hex, width: diameter, height: diameter,
                    zIndex: -id, left: leftPosition, top: topPosition,
                    animationName: "grow", animationDuration: "2s", animationDirection: "alternate", animationIterationCount: "infinite"}

                return (<div className="bubblesv2" style={style}></div>)

            })}
        </div>
        )
}

export default Bubble; 