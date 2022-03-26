import React from "react";

export default function NewTweetIcon(props){
    return(
        <div>
            <label className="small-font new-tweet-button pointer" htmlFor={props.id}>
                {props.label}
            </label>
            <input 
                type="file" name={props.name} id={props.id} 
                className={props.className} 
                accept={props.accept}
                onChange={props.onChange}
                value={props.value}
            />
        </div>
    )
}