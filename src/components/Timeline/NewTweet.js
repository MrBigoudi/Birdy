import React, { useState } from "react";

import "../../stylesheets/components/tweet.css";
import "../../stylesheets/components/newTweet.css";
import "../../stylesheets/form.css";

export default function NewTweet(props){

    const [tweetContent, setTweetContent] = useState(
        {text:"", image:"", imageDom:""}
    );

    const [error, setError] = useState(true);

    const handlePostTweet = async (event) => {
        //console.log("handlePostTweet");
        event.preventDefault();
        //console.log(tweetContent);
        if(!error){
            await props.user.createTweet(tweetContent.text, tweetContent.image);
            clearNewTweet();
            props.onPost(event);
        }
    }

    function resetError(){
        setError(prev => {
            if(tweetContent.text!=="" || tweetContent.image!==""){
                return false;
            }
            return true;
        });
    }

    function removeError(){
        setError(false);
    }

    function handleChange(event){
        setTweetContent( prev => {
            //console.log("[",event.target.name,",",event.target.value,"]");
            return {
                ...prev,
                [event.target.name]: event.target.value
            };
        });
        //console.log("onChange: error?", error);
        resetError();
    };

    function onImageChange(event){
        if(event.target.files && event.target.files[0]){
            const img = event.target.files[0];
            //console.log(img);
            //console.log(URL.createObjectURL(img));
            setTweetContent( prev => {
                return {
                    ...prev,
                    image: URL.createObjectURL(img)
                };
            });
        }
        //console.log("onImage: error?", error);
        removeError();
    }

    function clearNewTweet(){
        setTweetContent(prev => {return {text:"", image:"", imageDom:""};});
        setError(prev => true);
    }

    return(
        <div className="tweet new-tweet">
            <div className="left-side-tweet">
            <img src={props.user.getProfilePicture()}
                    alt="profile picture"
                    height="70" width="70"
                />
            </div>
            <div className="new-tweet-container">
                <header className="tweet-header">
                    <span className="color-light-pink bold huge-font">
                        {props.user.getUsername()}
                    </span>
                </header>
                <form>
                    <div className="tweet-content">
                        {tweetContent.image!="" && <img className="tweet-image" src={tweetContent.image} width={"250px"} alt="not found"/>}
                        <textarea className="new-tweet-text" 
                            placeholder="What's happening ?" required 
                            maxLength="140" rows="2"
                            name="text"
                            onChange={handleChange}
                            value={tweetContent.text}
                        />
                    </div>
                    <footer className="tweet-footer">
                        <label className="new-tweet-image-selector" htmlFor="imageFile">Img</label>
                        <input 
                            type="file" name="imageDom" id="imageFile" 
                            className="image-selector" 
                            accept="image/*"
                            onChange={(event) => {handleChange(event); onImageChange(event);}}
                            value={tweetContent.imageDom}
                        />
                        <input className="submit" onClick={ (event) => handlePostTweet(event) } type="button" value="Tweet"/>
                    </footer>
                </form>
            </div>
        </div>
    )
}