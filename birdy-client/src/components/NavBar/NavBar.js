import React from "react";
import BirdyLogo from "../../atomComponents/Birdy-logo.js";
import MenuIcon from "./MenuIcon.js";

import "../../stylesheets/components/navBar.css";

export default function NavBar(props){
    const menuIcons = props.menuIcons.map(item => {
        return (
            <MenuIcon 
                key={item.id}
                {...item}
            />
        )
    })

    return (
        <nav className="nav-bar">
            <div className="nav-link">
                    <BirdyLogo />
            </div>
            {menuIcons}
        </nav>
    )
}