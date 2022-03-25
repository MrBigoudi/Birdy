import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes.js";

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
                <Link className="link-no-style" to={props.logged ? ROUTES.PROFILE : ROUTES.DASHBOARD}>
                    <BirdyLogo />
                </Link>
            </div>
            {menuIcons}
        </nav>
    )
}