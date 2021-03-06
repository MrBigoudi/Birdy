import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import NavBar from "../components/NavBar/NavBar.js";
import Timeline from "../components/Timeline/Timeline.js";
import SideBar from "../components/SideBar/SideBar.js";

/* images */
import logoHome from "../images/icons/navBarIcons/outline_home_white_24dp_2x.png";
import logoExplore from "../images/icons/navBarIcons/outline_tag_white_24dp_2x.png";
import logoNotifications from "../images/icons/navBarIcons/outline_notifications_white_24dp_2x.png";
import logoMessages from "../images/icons/navBarIcons/outline_email_white_24dp_2x.png";
import logoBookmark from "../images/icons/navBarIcons/outline_bookmark_border_white_24dp_2x.png";
import logoLists from "../images/icons/navBarIcons/outline_list_alt_white_24dp_2x.png";
import logoProfile from "../images/icons/navBarIcons/outline_person_white_24dp_2x.png";
import logoMoreOptions from "../images/icons/navBarIcons/outline_more_horiz_white_24dp_2x.png";

// import { tweets } from "../database/tweets.js";
// import { users } from "../database/users.js";

const MAX_NB_TWEETS = 100;

export default function Profile(){
    const {state} = useLocation();
    const navigate = useNavigate();

    useEffect( () => {
        document.title = "Profile - Birdy";
        function getListTweets() {
            let {alreadyLogged, userId} = state;
            setAlreadyLogged({alreadyLogged, userId});
            if(alreadyLogged){
                //console.log('test already logged');
                axios
                    .get(`/apiTweet/tweet/${userId}/${MAX_NB_TWEETS}`)
                    .then( (res) => {
                        setTweets(res.data);
                    });
            } else {
                axios
                        .get(`/apiTweet/tweet/getNTweets/${MAX_NB_TWEETS}`)
                        .then( (res) => {
                            //console.log('tweets: ', res.data);
                            setTweets(res.data);
                        });
                }
            }
        getListTweets();
    }, [state]);

    const [tweets, setTweets] = useState([]);
    const [alreadyLogged, setAlreadyLogged] = useState({})

    function handleBackToUserPage(event){
        event.preventDefault();
        navigate(`/p/${user_id}`, { state: { alreadyLogged: false, userId: user_id }, replace: false, });
    }

    function handleListTweet(event){
        event.preventDefault();
        navigate(`/p/${user_id}`, { state: { alreadyLogged: true, userId: user_id }, replace: false, });
    }

    const menuIcons = [
        {id:"profile-home", src:logoHome, alt:"home menu", msg:"Home", onClick:handleBackToUserPage},
        {id:"profile-explore", src:logoExplore, alt:"explore menu", msg:"Explore"},
        {id:"profile-notifications", src:logoNotifications, alt:"notification menu", msg:"Notifications"},
        {id:"profile-messages", src:logoMessages, alt:"messages menu", msg:"Messages"},
        {id:"profile-bookmarks", src:logoBookmark, alt:"bookmarks menu", msg:"Bookmarks"},
        {id:"profile-lists", src:logoLists, alt:"lists menu", msg:"Lists", onClick:handleListTweet},
        {id:"profile-profile", src:logoProfile, alt:"profile menu", msg:"Profile"},
        {id:"profile-more", src:logoMoreOptions, alt:"more option menu", msg:"More"}
    ];

    //console.log('params: ', useParams())
    const user_id = useParams()['id'];

    const [user, setUser] = useState(
        async () => {
            await axios
                .get(`/api/user/${user_id}`)
                .then( (res) => {
                    //console.log('user: ', res.data);
                    setUser(res.data);
                });
        }
    );

    function scrollToTop() {
        document.getElementById("timeline-main").scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

    return(
        <div className="profile row max-height">
            <NavBar logged={true} menuIcons={menuIcons}/>
            <Timeline scroll={scrollToTop} default={false} tweets={tweets} user={user}/>
            <SideBar logged={true} user={alreadyLogged['alreadyLogged']? alreadyLogged['userId'] : user_id} connectedUser={alreadyLogged['alreadyLogged']? user_id : false}/>
        </div>
    )
};