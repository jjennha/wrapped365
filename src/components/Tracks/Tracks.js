import React, { useState, useEffect } from "react";
import * as $ from "jquery";
import { Cache } from "aws-amplify";
import TrackSingle from "../Single/TrackSingle";
import "./Tracks.css";
import "../Multiple/Multiple.css";
import TrackMultiple from "../Multiple/TrackMultiple";
import TopWrapper from "../Top/TopWrapper";


export default function Tracks({ errorHandler }) {
    const [token, setToken] = useState(Cache.getItem('authToken'));
    const [topTracks, setTopTracks] = useState([]);
    const [topTrack, setTopTrack] = useState({
        name: "",
        album: {
            images: [{ url: "" }]
        },
        artists: []
    });
    const [topShort, setTopShort] = useState(null);
    const [topLong, setTopLong] = useState(null);
    const [singleView, setSingleView] = useState(true);

    useEffect(() => {
        var t = Cache.getItem('authToken');
        setToken(t);
        getTopTracks("short_term");
        getTopTracks("long_term");
    }, [])

    function getShort() {
        setSingleView(true);
        setTopTrack(topShort);
    }
    function getLong() {
        setSingleView(true);
        setTopTrack(topLong);
    }
    function getLeaderboard() {
        setSingleView(false);
    }
    function getTopTracks(term) {
        $.ajax({
            url: `https://api.spotify.com/v1/me/top/tracks?time_range=${term}&limit=5`,
            type: "GET",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
                setTopTracks(data.items);
                if (term === "short_term") {
                    setTopShort(data.items[0]);
                    setTopTrack(data.items[0]);
                } else {
                    setTopLong(data.items[0]);
                }
            },
            error: data => {
                errorHandler(data);
            }
        });
    }


    return (
        <div>
            {
                singleView ?
                    <TopWrapper header="Your Top Track" headerClass="top-track-header" getShort={getShort} getLong={getLong} getLeaderboard={getLeaderboard}>
                        < TrackSingle name={topTrack.name} img={topTrack.album.images[0].url} album={topTrack.album.name} artists={topTrack.artists} />
                    </TopWrapper > :
                    <TopWrapper header="Your Top Tracks" headerClass="top-track-header" getShort={getShort} getLong={getLong} getLeaderboard={getLeaderboard}>
                        <TrackMultiple tracks={topTracks} />
                    </TopWrapper>
            }
        </div>
    )

}
