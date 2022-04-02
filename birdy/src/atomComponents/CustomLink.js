import React from "react";

export default function CustomLink(props){
    return (
        <a className="default-font link-no-style link-blue" target="_blanck" href={props.url}>{props.msg}</a>
    )
}