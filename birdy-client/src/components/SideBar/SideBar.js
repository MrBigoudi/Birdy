import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";

import SearchBar from "./SearchBar.js";

import "../../stylesheets/components/sideBar.css"
import axios from "axios";

export default function SideBar(props){
    const [follows, setFollows ] = useState([]);
    const [followed, setFollowed] = useState(false);
    const [userCurPage, setUserCurPage] = useState();
    const navigate = useNavigate();

    useEffect( () => {
            async function initFollows() {
                if(props.logged){
                    setUserCurPage(props.user)
                    await axios
                        .get(`/api/user/${props.user}/follows`)
                        .then( (res) => {
                            //console.log('res.data: ', res.data);
                            setFollows(res.data);
                        })
                    if(props.connectedUser){
                        await axios
                            .get(`/api/user/${props.connectedUser}`)
                            .then( (res) => {
                                setFollowed(res.data['following'].includes(props.user))
                            })
                    }
                } else {
                    setFollows([]);
                }
            }

            initFollows();

        },[props.logged, props.user, props.connectedUser]
    );

    const listFollows = () => {
        const listUsernameFollows = follows.map( (user) => {
            return (
                <li key={user['_id']}>
                    <h4 className="follow-list-username" onClick={(event) => handleCheckUserPage(event,user['_id'])}>
                        {user['username']}
                    </h4>
                </li>
            );
        });

        return (
            <div className="follow-list-handler">
                <div className="follow-list">
                    <h2 className="follow-list-title">{'Follows list'}</h2>
                    <ul className="follow-list-elem">{listUsernameFollows}</ul>
                </div>
            </div>
        )        
    }

    const handleClickFollowButton = () => {
        //console.log('userCurPage: ', { followId: userCurPage });
        axios
            .post(`/api/user/${props.connectedUser}/follows`, { followId: userCurPage })
            .then( () => {
                setFollowed(prev => {return !prev});
            })
    }

    async function handleCheckUserPage(event, userId){
        event.preventDefault();
        const loggedUser = userCurPage;
        //console.log('test handle check user page');
        if(loggedUser!==userId){
            navigate(`/p/${loggedUser}`, { state: { alreadyLogged: true, userId: userId }, replace: false, });
        }
    }

    const followButton = () => {
        return (
            <div className="follow-button-handler">
                <div className="follow-button" onClick={handleClickFollowButton}>
                    {followed ? "Unfollow" : "Follow"}
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
            {(props.connectedUser && props.connectedUser!==props.user)? followButton() : ''}
            {props.logged? listFollows() : ''}
        </section>
    )
}