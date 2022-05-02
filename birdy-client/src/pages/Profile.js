import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

import { tweets } from "../database/tweets.js";
// import { users } from "../database/users.js";

export default function Profile(){
    useEffect( () => {
        document.title = "Profile - Birdy";
    }, []);

    const menuIcons = [
        {id:"profile-home", src:logoHome, alt:"home menu", msg:"Home", onClick:scrollToTop},
        {id:"profile-explore", src:logoExplore, alt:"explore menu", msg:"Explore"},
        {id:"profile-notifications", src:logoNotifications, alt:"notification menu", msg:"Notifications"},
        {id:"profile-messages", src:logoMessages, alt:"messages menu", msg:"Messages"},
        {id:"profile-bookmarks", src:logoBookmark, alt:"bookmarks menu", msg:"Bookmarks"},
        {id:"profile-lists", src:logoLists, alt:"lists menu", msg:"Lists"},
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
            <SideBar logged={true}/>
        </div>
    )
};