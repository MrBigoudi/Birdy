import React, { useState } from "react";
import AutoLink from "react-native-autolink";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import CustomLink from "../../atomComponents/CustomLink.js";
import TweetIcon from "./TweetIcon.js";


import COMMENT_ICON from "../../images/icons/tweetIcons/outline_chat_bubble_outline_white_18dp_1x.png";
import RETWEET_ICON from "../../images/icons/tweetIcons/outline_reply_white_18dp_1x.png";
import LIKE_ICON from "../../images/icons/tweetIcons/outline_favorite_border_white_18dp_1x.png";
import SHARE_ICON from "../../images/icons/tweetIcons/outline_file_upload_white_18dp_1x.png";

import DEFAULT_PP from "../../images/icons/outline_account_circle_white_36dp_2x.png";

import "../../stylesheets/components/tweet.css";


//a tweet as a prop
export default function Tweet(props){

    const [nbReplies, setNbReplies] = useState([props.tweet['nbComments'], false]);
    const [nbRetweets, setNbRetweets] = useState([props.tweet['nbRetweets'], false]);
    const [nbLikes, setNbLikes] = useState([props.tweet['nbLikes'],false]);

    const [deleted, setDeleted] = useState(props.deleted);
    const navigate = useNavigate();

    const [author, setAuthor] = useState(
        async () => {
            await axios
                .get(`/api/user/${props.tweet['author']}`)
                .then( (res) => {
                    //console.log('user: ', res.data);
                    setAuthor(res.data);
                });
        }
    );

    function handleDelete(event){
        //console.log("handleDelete");
        setDeleted (prev => {
            return !prev;
        })
        return props.id;
    }

    // function handleReplyChange(event){
    //     setNbReplies( prev => {
    //         let replied = nbReplies[1]
    //         if(!replied)
    //             props.tweet.addReply();
    //         else
    //             props.tweet.removeReply();
    //         return [props.tweet.getNbReplies(), !replied];
    //     });
    // }

    async function handleRetweetChange(event){
        event.preventDefault();
        //console.log('tweet: ', props.tweet);
        let userId = props.user['_id'];
        let tweetId = props.tweet['_id'];
        // await Promise.all([
        //     axios
        //         .get(`/api/user/getUserId/${props.user['username']}`)
        //         .then( (res) => { userId = res.data; }),

        //     axios
        //         .post("/apiTweet/tweet/getTweetId", props.tweet)
        //         .then( (res) => { tweetId = res.data; }),
        // ]);
        //console.log('tweetId: ', tweetId);
        //console.log('userId: ', userId);
        //console.log('retweeted? ', nbRetweets[1]);
        if(!nbRetweets[1]){
            axios
                .put(`/api/user/${userId}/tweet/${tweetId}/retweet`)
                .then( () => {
                    axios
                        .get(`/apiTweet/tweet/${tweetId}`)
                        .then( (res) => {
                            //console.log('res last get: ', res);
                            setNbRetweets( prev => {
                                return [res.data['nbRetweets'], true];
                        });
                    });
                });
        } else {
            axios
                .put(`/api/user/${userId}/tweet/${tweetId}/unretweet`)
                .then( () => {
                    axios
                        .get(`/apiTweet/tweet/${tweetId}`)
                        .then( (res) => {
                            //console.log('res last get: ', res);
                            setNbRetweets( prev => {
                                return [res.data['nbRetweets'], false];
                        });
                    });
                });
        }
    }

    async function handleLikeChange(event){
        event.preventDefault();
        //console.log('tweet: ', props.tweet);
        let userId = '';
        let tweetId = '';
        await Promise.all([
            axios
                .get(`/api/user/getUserId/${props.user['username']}`)
                .then( (res) => { userId = res.data; }),

            axios
                .post("/apiTweet/tweet/getTweetId", props.tweet)
                .then( (res) => { tweetId = res.data; }),
        ]);
        //console.log('tweetId: ', tweetId);
        //console.log('userId: ', userId);
        //console.log('liked? ', nbLikes[1]);
        if(!nbLikes[1]){
            axios
                .put(`/api/user/${userId}/tweet/${tweetId}/like`)
                .then( () => {
                    axios
                        .get(`/apiTweet/tweet/${tweetId}`)
                        .then( (res) => {
                            //console.log('res last get: ', res);
                            setNbLikes( prev => {
                                return [res.data['nbLikes'], true];
                        });
                    });
                });
        } else {
            axios
                .put(`/api/user/${userId}/tweet/${tweetId}/unlike`)
                .then( () => {
                    axios
                        .get(`/apiTweet/tweet/${tweetId}`)
                        .then( (res) => {
                            //console.log('res last get: ', res);
                            setNbLikes( prev => {
                                return [res.data['nbLikes'], false];
                        });
                    });
                });
        }
    }

    async function handleCheckUserPage(event){
        event.preventDefault();
        //console.log('tweet: ', props.tweet);
        let userId = props.user['_id'];
        /*
        await axios
                .get(`/api/user/getUserId/${props.user['username']}`)
                .then( (res) => { userId = res.data; });
        */

        const author = props.tweet['author'];
        //console.log('test handle check user page');
        if(author!==userId){
            navigate(`/p/${userId}`, { state: { alreadyLogged: true, userId: author }, replace: false, });
        }
    }

    const text = props.tweet['content'];


    return(
        <article className="tweet">
            <div className="left-side-tweet">
                <img src={author['profilePicture']==="" ? DEFAULT_PP : author['profilePicture']}
                    alt="tweet author's profile picture"
                    height="60" width="60"
                />
            </div>
            <div className="tweet-container">
                <header className="tweet-header">
                    <span className={`color-light-pink bold tweet-username ${props.default? "disabled-pointer" : "pointer"}`}
                        onClick={props.default? undefined : handleCheckUserPage}
                    >
                        {author['username']}
                    </span>
                    <span className="color-light-grey">
                        {moment(props.tweet["dateCreated"]).fromNow()}
                    </span>
                </header>
                <main className="tweet-content">
                    {props.tweet['image']!=="" && <img className="tweet-image" src={props.tweet['image']} alt="Not Found" width={"300px"} />}
                    <AutoLink text={text} 
                        renderText={(txt) => <span className="default-font">{txt}</span>}
                        renderLink={(txt, match) => <CustomLink url={match.getAnchorHref()} msg={txt}/>}
                    />
                </main>
                <footer className="tweet-footer">
                    <TweetIcon default={props.default} onClick={props.default? undefined : undefined/*handleReplyChange*/} imageSrc={COMMENT_ICON} 
                        name="comments" cpt={nbReplies[0]} action={nbReplies[1] && "commented"}/>
                    <TweetIcon default={props.default} onClick={props.default? undefined : handleRetweetChange} imageSrc={RETWEET_ICON} 
                        name="retweet" cpt={nbRetweets[0]} action={nbRetweets[1] && "retweeted"}/>
                    <TweetIcon default={props.default} onClick={props.default? undefined : handleLikeChange} imageSrc={LIKE_ICON} 
                        name="like" cpt={nbLikes[0]} action={nbLikes[1] && "liked"}/>
                    <TweetIcon default={props.default} imageSrc={SHARE_ICON} name="share" cpt={0} />
                </footer>
            </div>
            <div className="ride-side-tweet">
                <input className="tweet-del-res" type="button" value="Hide" onClick={(event) => props.onDelete(event, handleDelete())} />
            </div>
        </article>
    )
}