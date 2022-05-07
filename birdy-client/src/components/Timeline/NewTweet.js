import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../stylesheets/components/tweet.css";
import "../../stylesheets/components/newTweet.css";
import "../../stylesheets/form.css";

import DEFAULT_PP from "../../images/icons/outline_account_circle_white_36dp_2x.png";

export default function NewTweet(props){

    const initTweetContent = {content:"", image:"", imageDom:"", gifDom:""}
    const [tweetContent, setTweetContent] = useState(initTweetContent);
    const navigate = useNavigate();

    const [error, setError] = useState(true);

    const handlePostTweet = async (event) => {
        //console.log("handlePostTweet");
        event.preventDefault();
        //console.log(tweetContent);
        if(!error){
            //on recupere l'id de l'auteur
            let userId = `${props.user['_id']}`;

            const formData = {
                author: `${userId}`,
                content: tweetContent['content'],
                image: tweetContent['image']
            }

            //on recupere l'id du tweet
            await axios
                .post("/apiTweet/tweet/newTweet", formData)
                .then( async (res) => { 
                    let newTweetId = res.data.id; 
                    await props.onPost(event, newTweetId);
                });

            //await props.user.createTweet(tweetContent.content, tweetContent.image);
            //console.log('newTweetId: ', newTweetId);
            clearNewTweet();
            navigate(`/p/${userId}`, { state: { alreadyLogged: false, userId: userId }, replace: false, });
        }
    }

    function resetError(){
        setError(prev => {
            if(tweetContent.content!=="" || tweetContent.image!==""){
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
            <img src={props.user['profilePicture']!=="" ? props.user['profilePicture'] : DEFAULT_PP}
                    alt="user's profile"
                    height="70" width="70"
                />
            </div>
            <div className="new-tweet-container">
                <header className="tweet-header">
                    <span className="color-light-pink bold huge-font">
                        {props.user['username']}
                    </span>
                </header>
                <form>
                    <div className="tweet-content">
                        {tweetContent.image!=="" && <img className="tweet-image" src={tweetContent.image} width={"250px"} alt="not found"/>}
                        <textarea className="new-tweet-text" 
                            placeholder="What's happening ?" required 
                            maxLength="140" rows="2"
                            name="content"
                            onChange={handleChange}
                            value={tweetContent.content}
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