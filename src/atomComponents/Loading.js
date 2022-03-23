import React from "react";
import BirdyLogo from "../atomComponents/Birdy-logo";

import "../stylesheets/components/loading.css";

export default function Loading(){
    return(
        <div className="loading">
            <BirdyLogo />
            <p>Loading...</p>
        </div>
    )
}