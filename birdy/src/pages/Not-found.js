import { React, useEffect } from "react";

export default function NotFound(){

    useEffect( () => {
        document.title = '404 - Not Found';
    })

    return(
        <main className="title-container">
            <h1 className="page-title">404 - Not&ensp;Found</h1>
        </main>
    )
};