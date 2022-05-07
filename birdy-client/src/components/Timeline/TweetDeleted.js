import React, { useState } from "react";

import "../../stylesheets/components/tweet.css";

export default function TweetDeleted(props){

    const [deleted, setDeleted] = useState(props.deleted);

    function handleDelete(event){
        //console.log("handleDelete");
        setDeleted (prev => {
            return !deleted;
        })
        return props.id;
    }

    return (
        <article className="tweet tweet-deleted">
            <span className="tweet-del-msg color-light-grey">This tweet has been successfully hidden</span>
            <input className="tweet-del-res" type="button" value="Res" onClick={(event) => props.onDelete(event, handleDelete())} />
        </article>
    )
}