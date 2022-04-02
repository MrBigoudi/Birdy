import React from "react";

import "../../stylesheets/components/menuIcon.css";

export default function MenuIcon(props){
    return (
        <div onClick={props.onClick} className="menu-icon">
            <img className="menu-icon-img" src={props.src} alt={props.alt} 
                height="40" width="40"
            />
            <h2 className="menu-icon-msg">{props.msg}</h2>
        </div>
    )
}