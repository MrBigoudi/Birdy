import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as ROUTES from "../constants/routes.js";

import BirdyLogo from "../atomComponents/Birdy-logo.js";
import "../stylesheets/pages/signup.css";
import "../stylesheets/form.css";

import { checkAlreadyExist, addUserFromSignup } from "../database/users.js";

export default function Signup(){
    useEffect( () => {
        document.title = "Signup - Birdy";
    },[]);

    const onFocusHandler = (e) => {
        e.target.type = "date";
    };

    const onBlurHandler = (e) => {
        e.target.type = "text";
    };

    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {username:"", dateOfBirth:"", fullname:"", emailAddress:"", password:""}
    );

    const [error, setError] = useState(true);

    const isInvalid = formData.password === "" || formData.emailAddress === "" 
                        || formData.username === "" || formData.dateOfBirth === ""
                        || formData.fullname === "";

    function handleChange(event){
        setFormData( prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        try{
            await checkAlreadyExist(formData.username, formData.emailAddress);
            addUserFromSignup(formData);
            navigate(ROUTES.DASHBOARD);
        } catch (err) {
            setError(err.message);
        }
    }
    
    return(
        <main className="form-page-main column gap20">
            <div className="form-container column gap20">
                <BirdyLogo />
                <form className="base-form column" onSubmit={handleSignup}>
                    <input
                        className="form-input" 
                        type="text" 
                        placeholder="Username" 
                        aria-label="Enter your username"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                    />
                    <input
                        className="form-input" 
                        type="text" 
                        placeholder="Fullname" 
                        aria-label="Enter your fullname"
                        name="fullname"
                        onChange={handleChange}
                        value={formData.fullname}
                    />
                    <input
                        className="form-input signup-birthday"
                        type="text"
                        onFocus={onFocusHandler}
                        onBlur={onBlurHandler}
                        placeholder="Date of Birth"
                        aria-label="Enter your date of birth"
                        name="dateOfBirth"
                        onChange={handleChange}
                        value={formData.dateOfBirth}
                    />
                    <input
                        className="form-input" 
                        type="email" 
                        placeholder="Email address" 
                        aria-label="Enter your email address"
                        name="emailAddress"
                        onChange={handleChange}
                        value={formData.emailAddress}
                    />
                    <input
                        className="form-input" 
                        type="password" 
                        placeholder="Password" 
                        aria-label="Enter your password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}                   
                    />
                    <input 
                        className={`form-submit ${isInvalid && "submit-invalid" || "submit"}`}
                        type="submit" 
                        value="Sign Up"
                        disabled={isInvalid}
                    />
                </form>
                {error && <p className="error-message form-error">{error}</p>}
            </div>
            <div className="base-form-footer">
                <p>
                    Have an account?&ensp;
                    <Link className="link-route" to={ROUTES.LOGIN}>
                        Log in
                    </Link>
                </p>
            </div>
        </main>
    )
};