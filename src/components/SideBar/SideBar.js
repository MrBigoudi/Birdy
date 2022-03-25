import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";

import SearchBar from "./SearchBar.js";

import "../../stylesheets/components/sideBar.css"

export default function SideBar(props){
    return(
        <section className="side-bar">
            <SearchBar />
            <div className="side-bar-connections">
                <div className="link-handler">
                    <Link className="link-route link-no-style link-blue" to={props.logged ? ROUTES.DASHBOARD : ROUTES.LOGIN} >
                        {props.logged ? "Log Out" : "Log In"}
                    </Link>
                </div>
                <div className="link-handler">
                    <Link className="link-route link-no-style link-blue" to={ROUTES.SIGN_UP}>
                        Sign Up
                    </Link> 
                </div>
            </div>
        </section>
    )
}