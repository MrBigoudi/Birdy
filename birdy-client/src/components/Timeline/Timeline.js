import React, { useState, useEffect } from "react"
import axios from "axios";

import Tweet from "./Tweet.js";
import NewTweet from "./NewTweet.js";
import TweetDeleted from "./TweetDeleted.js";

import "../../stylesheets/components/timeline.css";

const MAX_NB_TWEETS = 100;

//props an array of tweets to render
//default: boolean
export default function Timeline(props){
    const [tweetList, setTweetList] = useState([]);
    const [tweets, setTweets] = useState([]);

    //console.log('props.tweets: ', props.tweets);
    //console.log('tweetList: ', tweetList);

    useEffect( () => {
        let listTmp = props.tweets.map( item => {
           return [item, false]; //[value, deleted?]
        })

        function handleHideTweet(event, id){
            //console.log("handleHideTweet");
            setTweetList( prev => {
                //console.log("setTweetList");
                const tweetListTmp = ( prev.map(item => {
                    if(item[0]['index']===id)
                    {
                        //console.log("hidden");
                        return [item[0], !item[1]];
                    }
                    else
                    {
                        //console.log(id);
                        return item;
                    }
                }));
                setTweets(genTweetsToRender(tweetListTmp));
                return tweetListTmp;
            });
        }

        function genTweetsToRender(listToMap){
            //console.log('list to map: ', listToMap);
            const listResult = 
                listToMap.map((item) => {
                    const tweetId = item[0]['index']; 
                    if (!item[1])
                    {
                        return(
                            <Tweet 
                                key={tweetId}
                                id={tweetId}
                                tweet={item[0]}
                                default={props.default}
                                user={props.user}
                                deleted={false}
                                onDelete={handleHideTweet}
                            />
                        );
                    }
                    else
                    {
                        return(
                            <TweetDeleted 
                                key={tweetId} 
                                id={tweetId} 
                                deleted={true} 
                                onDelete={handleHideTweet}
                            />
                        );
                    }
                });
            //console.log('listResult: ', listResult);
            return listResult;
        }

        setTweetList(listTmp);
        setTweets(genTweetsToRender(listTmp));

    }, [props.tweets, props.default, props.user]);

    function genTweetsToRender(listToMap){
        //console.log('list to map: ', listToMap);
        const listResult = 
            listToMap.map((item) => {
                const tweetId = item[0]['index']; 
                if (!item[1])
                {
                    return(
                        <Tweet 
                            key={tweetId}
                            id={tweetId}
                            tweet={item[0]}
                            default={props.default}
                            user={props.user}
                            deleted={false}
                            onDelete={handleHideTweet}
                        />
                    );
                }
                else
                {
                    return(
                        <TweetDeleted 
                            key={tweetId} 
                            id={tweetId} 
                            deleted={true} 
                            onDelete={handleHideTweet}
                        />
                    );
                }
            });
        //console.log('listResult: ', listResult);
        return listResult;
    }

    function handleHideTweet(event, id){
        //console.log("handleHideTweet");
        setTweetList( prev => {
            //console.log("setTweetList");
            const tweetListTmp = ( prev.map(item => {
                if(item[0]['index']===id)
                {
                    //console.log("hidden");
                    return [item[0], !item[1]];
                }
                else
                {
                    //console.log(id);
                    return item;
                }
            }));
            setTweets(genTweetsToRender(tweetListTmp));
            return tweetListTmp;
        });
    }

    function handleRenderNewTweet(event, newTweetId){
        axios
            .get(`/apiTweet/tweet/getNTweets/${MAX_NB_TWEETS}`)
            .then( (res) => {
                //console.log('tweets: ', res.data);
                setTweetList(prev => {
                    const tweetListTmp = res.data.map( item => {
                        return [item, false];
                    })
                    setTweets(genTweetsToRender(tweetListTmp));
                    return tweetListTmp;
                });
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
                    {tweets===[] ? "" : tweets}
                </section>
            </main>
        </div>
    )
}