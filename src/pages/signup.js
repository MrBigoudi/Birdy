import React, { useEffect } from "react";

export default function Signup(){
    useEffect( () => {
        document.title = "Sign Up - Birdy";
    },[]);
    
    return(
        <p>Hello from Signup</p>
    )
};