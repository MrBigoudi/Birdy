import React from "react";

import logoSearch from "../../images/icons/sideBarIcons/outline_search_white_24dp_1x.png";

import "../../stylesheets/components/searchBar.css";

export default function SearchBar(){
    return(
        <div className="search-bar">
            <img className="search-logo" src={logoSearch} alt="research logo"/>
            <input
                className="search-input" 
                type="search" 
                placeholder="Search Birdy..." 
                maxLength="50"
                aria-label="Search through site content"
            />
        </div>
    )
}