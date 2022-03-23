import React, { useState } from "react"

import Tweet from "./Tweet.js";
import NewTweet from "./NewTweet.js";
import TweetDeleted from "./TweetDeleted.js";

import "../../stylesheets/components/timeline.css";

//props an array of tweets to render
//default: boolean
export default function Timeline(props){

    const [tweetList, setTweetList] = useState(props.tweets.map( item => {
                                        return [item, false]; //[value, deleted?]
                                    }));

    const tweets = tweetList.map(item => {
        if (!item[1])
        {
            return(
                <Tweet 
                    key={item[0].getId()}
                    id={item[0].getId()}
                    tweet={item[0]}
                    default={props.default}
                    deleted={false}
                    onDelete={handleDeleteTweet}
                />
            );
        }
        else
        {
            return(
                <TweetDeleted 
                    key={item[0].getId()} 
                    id={item[0].getId()} 
                    deleted={true} 
                    onDelete={handleDeleteTweet}
                />
            );
        }
    });

    function handleDeleteTweet(event, id){
        //console.log("handleDeleteTweet");
        setTweetList( prev => {
            //console.log("setTweetList");
            return( prev.map(item => {
                if(item[0].getId()===id)
                {
                    //console.log("deleted");
                    return [item[0], !item[1]];
                }
                else
                {
                    //console.log(id);
                    return item;
                }
            }));
        });
    }

    return (
        <div className="timeline column">
            <header className="timeline-header">
                <div onClick={props.scroll} className="timeline-home">Home</div>
            </header>
            <main id="timeline-main" className="timeline-main">
                {/* if default timeline, no new tweets needed */}
                {props.default || <NewTweet />}
                <section>
                    {tweets}
                </section>
            </main>
        </div>
    )
}