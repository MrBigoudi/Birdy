import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as ROUTES from "../constants/routes.js";
import * as ERROR_MSG from "../constants/errorMessages.js";

import BirdyLogo from "../atomComponents/Birdy-logo.js";
import "../stylesheets/form.css";

import { checkLogin } from "../database/users.js";

export default function Login(){

    const navigate = useNavigate();

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

    const handleLogin = async (event) => {
        event.preventDefault();

        try{
            await checkLogin(formData.emailAddress, formData.password);
            navigate(ROUTES.DASHBOARD);
        } catch (err) {
            setError(err.message);
            if(err.message === ERROR_MSG.WRONG_PASSWD){
                setFormData( prev => {return {...prev, password:""}});
            }
        }
    }

    return(
        <main className="form-page-main column gap20">
            <div className="form-container column gap20">
                <BirdyLogo />
                <form className="base-form column" onSubmit={handleLogin}>
                    <input
                        className="form-input" 
                        type="email" 
                        placeholder="Email address" 
                        aria-label="Enter your email address"
                        onChange={handleChange}
                        name="emailAddress"
                        value={formData.emailAddress}
                    />
                    <input
                        className="form-input" 
                        type="password" 
                        placeholder="Password" 
                        aria-label="Enter your password"
                        onChange={handleChange}
                        name="password"
                        value={formData.password}                        
                    />
                    <input 
                        className={`form-submit ${isInvalid && "submit-invalid" || "submit"}`}
                        type="submit" 
                        value="Log In"
                        disabled={isInvalid}
                    />
                </form>
                {error && <p className="error-message form-error">{error}</p>}
            </div>
            <div className="base-form-footer">
                <p>
                    Don't have an account?&ensp;
                    <Link className="link-route" to={ROUTES.SIGN_UP}>
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    )
};