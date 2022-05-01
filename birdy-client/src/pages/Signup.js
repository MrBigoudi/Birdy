import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import * as ROUTES from "../constants/routes.js";

import BirdyLogo from "../atomComponents/Birdy-logo.js";
import "../stylesheets/pages/signup.css";
import "../stylesheets/form.css";

// import { checkAlreadyExist, addUserFromSignup } from "../database/users.js";

export default function Signup(){
    const server_config = {
        headers: {
            'Access-Control-Allow-Origin': "*",
            'Content-Type': 'application/json:charset=UTF-8',
        }
    }

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
        {username:"", dateOfBirth:"", fullname:"", emailAddress:"", passwd:""}
    );

    const [error, setError] = useState(true);

    const isInvalid = formData.passwd === "" || formData.emailAddress === "" 
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

    const answer_signup = (res) => {
        console.log('res.data: ', res.data);
        if(res.data['status'] !== 201){
            setError(res.data['message']);
            console.log('error: ', error);
        }else{
            const _id = res.data['id'];
            console.log('user_id: ', _id);
            navigate(`/p/${_id}`);
        }
    }

    const answer_signup_err = (err) => {
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('err.response.data: ',    err.response.data);
            console.log('err.response.status: ',  err.response.status);
            console.log('err.response.headers: ', err.response.headers);
            setError(err.response.data['message']);
        } else if (err.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message);
        }
        
        console.log(err.config);
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        axios
            .post("/api/user/signup", formData)
            .then( (res) => {
                console.log('then');
                answer_signup(res);
            })
            .catch( (err) => {
                console.log('catch');
                answer_signup_err(err);
            });
        /*
        try{
            await checkAlreadyExist(formData.username, formData.emailAddress);
            addUserFromSignup(formData);
            navigate(ROUTES.PROFILE);
        } catch (err) {
            setError(err.message);
        }
        */
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
                        name="passwd"
                        onChange={handleChange}
                        value={formData.passwd}                   
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