import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";

import SearchBar from "./SearchBar.js";

import "../../stylesheets/components/sideBar.css"
import axios from "axios";

export default function SideBar(props){
    const [follows, setFollows ] = useState([]);
    const [followed, setFollowed] = useState(false);

    useEffect( () => {
            async function initFollows() {
                if(props.logged){
                    await axios
                        .get(`/api/user/${props.user}/follows`)
                        .then( (res) => {
                            //console.log('res.data: ', res.data);
                            setFollows(res.data);
                        })
                } else {
                    setFollows([]);
                }
            }

            initFollows();

        },[props.logged, props.user]
    );

    const listFollows = () => {
        const listUsernameFollows = follows.map( (user) => {
            return (
                <li>
                    <h3>{user['username']}</h3>
                </li>
            );
        });

        return (
            <div className="follow-list">
                <h2 className="follow-list-title">{'Follows list'}</h2>
                <ul>{listUsernameFollows}</ul>
            </div>
        )        
    }

    const handleClickFollowButton = () => {
        setFollowed(prev => {return !prev});
    }

    const followButton = () => {
        return (
            <div className="follow-button-handler">
                <div className="follow-button" onClick={handleClickFollowButton}>
                    {followed/*test already followd*/ ? "Follow" : "Unfollow"}
                </div>
            </div>
        );
    }

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
            {props.connectedUser? followButton() : ''}
            {props.logged? listFollows() : ''}
        </section>
    )
}