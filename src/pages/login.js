import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes.js";

import BirdyLogo from "../atomComponents/Birdy-logo.js";
import "../stylesheets/login.css";

export default function Login(){

    const [formData, setFormData] = useState(
        {emailAddress:"", password:""}
    );

    const [error, setError] = useState("");
    const isInvalid = formData.password === "" || formData.emailAddress === "";

    useEffect( () => {
        document.title = "Login - Birdy";
    }, []);

    function handleChange(event){
        setFormData( prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    };

    return(
        <main className="login-main column gap20">
            <div className="login-form-container column gap20">
                <BirdyLogo />
                <form className="login-form column" method="POST">
                    <input
                        className="login-form-input" 
                        type="email" 
                        placeholder="Email address" 
                        aria-label="Enter your email address"
                        onChange={handleChange}
                        name="emailAddress"
                        value={formData.emailAddress}
                    />
                    <input
                        className="login-form-input" 
                        type="password" 
                        placeholder="Password" 
                        aria-label="Enter your password"
                        onChange={handleChange}
                        name="password"
                        value={formData.password}                        
                    />
                    <input 
                        className={`login-form-submit ${isInvalid && "login-invalid"}`}
                        type="submit" 
                        value="Log In"
                        disabled={isInvalid}
                    />
                </form>
            </div>
            <div className="login-no-account">
                <p>
                    Don't have an account?&ensp;
                    <Link className="login-ref-signup" to={ROUTES.SIGN_UP}>
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    )
};