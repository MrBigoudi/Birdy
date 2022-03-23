import React from "react";

import "../../stylesheets/components/tweetIcons.css";

export default function TweetIcon(props){
    return(
        <div className="tweet-icon-container">
            <div onClick={props.onClick} className={`tweet-icon round pointer ${props.name}`}>
                <img src={props.imageSrc} alt={props.name} />
            </div>
            {props.cpt > 0 && <span className={`tweet-icon-cpt ${props.action}`}>{props.cpt}</span>}
        </div>
    )
}