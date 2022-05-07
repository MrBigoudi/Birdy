import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import * as ROUTES from "../constants/routes.js";
// import * as ERROR_MSG from "../constants/errorMessages.js";

import BirdyLogo from "../atomComponents/Birdy-logo.js";
import "../stylesheets/form.css";

// import { checkLogin } from "../database/users.js";

export default function Login(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {emailAddress:"", passwd:""}
    );

    const [error, setError] = useState("");

    const isInvalid = formData.passwd === "" || formData.emailAddress === "";

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

    const answer_login = async (res) => {
        //console.log('res.data: ', res.data);
        if(res.data['status'] !== 200){
            setError(res.data['message']);
            console.log('error: ', error);
        }else{
            const _id = res.data['id'];
            //console.log('user_id: ', _id);
            navigate(`/p/${_id}`, { state: {}, replace: true, });
        }
    }

    const answer_login_err = (err) => {
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('err.response.data: ',    err.response.data);
            console.log('err.response.status: ',  err.response.status);
            console.log('err.response.headers: ', err.response.headers);
            setError(err.response.data['message']);
            if(err.response.status === 403){
                setFormData( prev => {return {...prev, passwd:""}});
            }
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

    const handleLogin = async (event) => {
        event.preventDefault();
        axios
            .post("/api/user/login", formData)
            .then( (res) => {
                //console.log('then');
                answer_login(res);
            })
            .catch( (err) => {
                //console.log('catch');
                answer_login_err(err);
            });
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
                        name="passwd"
                        value={formData.passwd}                        
                    />
                    <input 
                        className={`form-submit ${(isInvalid && "submit-invalid") || "submit"}`}
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