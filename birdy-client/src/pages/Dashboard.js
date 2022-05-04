import React, { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "../components/NavBar/NavBar.js";
import Timeline from "../components/Timeline/Timeline.js";
import SideBar from "../components/SideBar/SideBar.js";

/* images */
import logoHome from "../images/icons/navBarIcons/outline_home_white_24dp_2x.png";
import logoExplore from "../images/icons/navBarIcons/outline_tag_white_24dp_2x.png";
import logoMoreOptions from "../images/icons/navBarIcons/outline_more_horiz_white_24dp_2x.png";

//import { tweets } from "../database/tweets.js";

const MAX_NB_TWEETS = 100;

export default function Dashboard(){

    useEffect( () => {
        document.title = "Dashboard - Birdy";
        async function getListTweets() {
            await axios
                    .get(`/apiTweet/tweet/getNTweets/${MAX_NB_TWEETS}`)
                    .then( (res) => {
                        //console.log('tweets: ', res.data);
                        setTweets(res.data);
                    });
            }
        getListTweets();
    }, []);

    const [tweets, setTweets] = useState([]);

    const menuIcons = [
        {id:"dash-home", src:logoHome, alt:"home menu", msg:"Home", onClick:scrollToTop},
        {id:"dash-explore", src:logoExplore, alt:"explore menu", msg:"Explore"},
        {id:"dash-more", src:logoMoreOptions, alt:"more option menu", msg:"More"}
    ];

    function scrollToTop() {
        document.getElementById("timeline-main").scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

    return(
        <div className="dahsboard row max-height">
            <NavBar menuIcons={menuIcons}/>
            <Timeline scroll={scrollToTop} default={true} tweets={tweets}/>
            <SideBar />
        </div>
    )
};