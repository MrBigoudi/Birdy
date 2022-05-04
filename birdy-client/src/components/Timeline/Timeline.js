import React, { useState, useEffect } from "react"
//import axios from "axios";

import Tweet from "./Tweet.js";
import NewTweet from "./NewTweet.js";
import TweetDeleted from "./TweetDeleted.js";

import "../../stylesheets/components/timeline.css";

//props an array of tweets to render
//default: boolean
export default function Timeline(props){
    useEffect( () => {
        setTweetList(props.tweets.map( item => {
            return [item, false]; //[value, deleted?]
        }));
    }, [props.tweets]); 
    
    const [tweetList, setTweetList] = useState(props.tweets.map( item => {
                                        return [item, false]; //[value, deleted?]
                                    }));

    function genTweetsToRender(){
        //console.log(tweetList);
        return (
            tweetList.map(item => {
                if (!item[1])
                {
                    return(
                        <Tweet 
                            key={item[0]['index']}
                            id={item[0]['index']}
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
                            key={item[0]['index']} 
                            id={item[0]['index']} 
                            deleted={true} 
                            onDelete={handleDeleteTweet}
                        />
                    );
                }
            })
        )
    }

    const tweets = genTweetsToRender();

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

    function handleRenderNewTweet(event){
        //console.log("handleRenderNewTweet");
        setTweetList( prev => {
            //console.log("setter");
            prev.unshift([props.tweets[0], false]);
            return([...prev]);
        });
    }

    return (
        <div className="timeline column">
            <header className="timeline-header">
                <div onClick={props.scroll} className="timeline-home">Home</div>
            </header>
            {/* if default timeline, no new tweets needed */}
            {props.default || <NewTweet onPost={handleRenderNewTweet} user={props.user} />}
            <main id="timeline-main" className="timeline-main">
                <section className="timeline-tweets">
                    {tweets}
                </section>
            </main>
        </div>
    )
}