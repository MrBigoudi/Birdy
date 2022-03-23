import React from "react";

import "../../stylesheets/components/newTweet.css";
import "../../stylesheets/components/tweet.css";
import "../../stylesheets/form.css";

export default function NewTweet(props){
    return(
        <div className="tweet">
            <div className="left-side-tweet">
                Left side NewTweet
            </div>
            <div className="new-tweet-container">
                <form className="tweet-content">
                    <textarea className="new-tweet-text" 
                        placeholder="What's happening ?" required 
                        maxLength="140" rows="3"
                    />
                    <footer className="tweet-footer">
                        NewTweet footer
                        <input className="submit" type="submit" value="Tweet"/>
                    </footer>
                </form>
            </div>
        </div>
    )
}