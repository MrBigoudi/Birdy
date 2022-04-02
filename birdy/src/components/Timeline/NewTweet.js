import React, { useState } from "react";

import "../../stylesheets/components/tweet.css";
import "../../stylesheets/components/newTweet.css";
import "../../stylesheets/form.css";

export default function NewTweet(props){

    const initTweetContent = {text:"", image:"", imageDom:"", gifDom:""}
    const [tweetContent, setTweetContent] = useState(initTweetContent);

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
        setTweetContent(prev => {return initTweetContent;});
        setError(prev => true);
    }

    return(
        <div id="new-tweet" className="tweet new-tweet">
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
                        {tweetContent.image!=="" && <img className="tweet-image" src={tweetContent.image} width={"250px"} alt="not found"/>}
                        <textarea className="new-tweet-text" 
                            placeholder="What's happening ?" required 
                            maxLength="140" rows="2"
                            name="text"
                            onChange={handleChange}
                            value={tweetContent.text}
                        />
                    </div>
                    <footer className="tweet-footer">
                        <div className="new-tweet-icons">
                            <label className="small-font new-tweet-button pointer" htmlFor="imageFile">Img</label>
                            <input 
                                type="file" name="imageDom" id="imageFile" 
                                className="display-none" 
                                accept="image/png"
                                onChange={(event) => {handleChange(event); onImageChange(event);}}
                                value={tweetContent.imageDom}
                            />
                            <label className="small-font new-tweet-button pointer" htmlFor="gifFile">Gif</label>
                            <input 
                                type="file" name="gifDom" id="gifFile" 
                                className="display-none" 
                                accept="image/gif"
                                onChange={(event) => {handleChange(event); onImageChange(event);}}
                                value={tweetContent.gifDom}
                            />
                        </div>
                        <input className="small-font new-tweet-button pointer" onClick={ (event) => handlePostTweet(event) } type="button" value="Tweet"/>
                    </footer>
                </form>
            </div>
        </div>
    )
}