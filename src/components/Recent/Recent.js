import React, { useState, useEffect } from "react";
import * as $ from "jquery";
import { Cache } from "aws-amplify";
import Genres from "./Genres/Genres";

export default function Recent({errorHandler}) {
    const [token] = useState(Cache.getItem('authToken'));
    const [recent,setRecent] = useState([]);
    
    useEffect(() => {
        getRecent(getYesterday());
    },[])
    function getYesterday() {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 2);
        return yesterday.getTime();
    }
    
    function getRecent(after){
        $.ajax({
            url: `https://api.spotify.com/v1/me/player/recently-played?limit=50&after=${after}`,
            type: "GET",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
                setRecent(data.items);
            },
            error: data => {
                errorHandler(data);
            }
        });
    }
    
    return (
        <div className="app-container">
            <Genres tracks={recent} errorHandler={errorHandler}/>
        </div>

    )
}
