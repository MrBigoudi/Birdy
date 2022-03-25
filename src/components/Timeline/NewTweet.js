import React, { useState } from "react";

import "../../stylesheets/components/tweet.css";
import "../../stylesheets/components/newTweet.css";
import "../../stylesheets/form.css";

export default function NewTweet(props){

    const [tweetContent, setTweetContent] = useState(
        {text:"", image:""}
    );

    const handlePostTweet = async (event) => {
        console.log("handlePostTweet");
        event.preventDefault();
        await props.user.createTweet(tweetContent.text);
    }

    function handleChange(event){
        setTweetContent( prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    };

    return(
        <div className="tweet new-tweet">
            <div className="left-side-tweet">
            <img src={props.user.getProfilePicture()}
                    alt="profile picture"
                    height="70" width="70"
                />
            </div>
            <div className="new-tweet-container">
                <form className="tweet-content">
                    <textarea className="new-tweet-text" 
                        placeholder="What's happening ?" required 
                        maxLength="140" rows="3"
                        name="text"
                        onChange={handleChange}
                    />
                    <footer className="tweet-footer">
                        NewTweet footer
                        <input className="submit" onClick={ (event) => {handlePostTweet(event); props.onPost(event);} } type="button" value="Tweet"/>
                    </footer>
                </form>
            </div>
        </div>
    )
}