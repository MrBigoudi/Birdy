import React, { useState } from "react";
import AutoLink from "react-native-autolink";
import axios from "axios";

import CustomLink from "../../atomComponents/CustomLink.js";
import TweetIcon from "./TweetIcon.js";


import COMMENT_ICON from "../../images/icons/tweetIcons/outline_chat_bubble_outline_white_18dp_1x.png";
import RETWEET_ICON from "../../images/icons/tweetIcons/outline_reply_white_18dp_1x.png";
import LIKE_ICON from "../../images/icons/tweetIcons/outline_favorite_border_white_18dp_1x.png";
import SHARE_ICON from "../../images/icons/tweetIcons/outline_file_upload_white_18dp_1x.png";

import DEFAULT_PP from "../../images/icons/outline_account_circle_white_36dp_2x.png";


//a tweet as a prop
export default function Tweet(props){

    const [nbReplies, setNbReplies] = useState([props.tweet['nbComments'], false]);
    const [nbRetweets, setNbRetweets] = useState([props.tweet['nbRetweets'], false]);
    const [nbLikes, setNbLikes] = useState([props.tweet['nbLikes'],false]);

    const [deleted, setDeleted] = useState(props.deleted);

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

    function handleReplyChange(event){
        setNbReplies( prev => {
            let replied = nbReplies[1]
            if(!replied)
                props.tweet.addReply();
            else
                props.tweet.removeReply();
            return [props.tweet.getNbReplies(), !replied];
        });
    }

    function handleRetweetChange(event){
        setNbRetweets( prev => {
            let retweeted = nbRetweets[1]
            if(!retweeted)
                props.tweet.addRetweet();
            else
                props.tweet.removeRetweet();
            return [props.tweet.getNbRetweets(), !retweeted];
        });
    }

    function handleLikeChange(event){
        setNbLikes( prev => {
            let liked = nbLikes[1]
            if(!liked)
                props.tweet.addLike();
            else
                props.tweet.removeLike();
            return [props.tweet.getNbLikes(), !liked];
        });
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
                    <span className="color-light-pink bold">
                        {author['username']}
                    </span>
                    <span className="color-light-grey">
                        {props.tweet["dateCreated"]}
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
                    <TweetIcon onClick={props.default? undefined : handleReplyChange} imageSrc={COMMENT_ICON} 
                        name="comments" cpt={nbReplies[0]} action={nbReplies[1] && "commented"}/>
                    <TweetIcon onClick={props.default? undefined : handleRetweetChange} imageSrc={RETWEET_ICON} 
                        name="retweet" cpt={nbRetweets[0]} action={nbRetweets[1] && "retweeted"}/>
                    <TweetIcon onClick={props.default? undefined : handleLikeChange} imageSrc={LIKE_ICON} 
                        name="like" cpt={nbLikes[0]} action={nbLikes[1] && "liked"}/>
                    <TweetIcon imageSrc={SHARE_ICON} name="share" cpt={0} />
                </footer>
            </div>
            <div className="ride-side-tweet">
                <input className="tweet-del-res" type="button" value="Hide" onClick={(event) => props.onDelete(event, handleDelete())} />
            </div>
        </article>
    )
}