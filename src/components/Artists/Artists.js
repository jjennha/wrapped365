import React, { useState, useEffect } from "react";
import * as $ from "jquery";
import { Cache } from "aws-amplify";
import ArtistSingle from "../Single/ArtistSingle"
import ArtistMultiple from "../Multiple/ArtistMultiple";
import "./Artists.css";
import TopWrapper from "../Top/TopWrapper";

export default function Artists({ errorHandler }) {
    const [token, setToken] = useState(Cache.getItem('authToken'));
    const [topArtists, setTopArtists] = useState([]);
    const [topArtist, setTopArtist] = useState({
        name: "",
        followers: { total: 0 },
        images: [{ url: "" }]
    });
    const [topShort, setTopShort] = useState(null);
    const [topLong, setTopLong] = useState(null);
    const [singleView, setSingleView] = useState(true);

    useEffect(() => {
        var t = Cache.getItem('authToken');
        setToken(t);
        getTopArtists("short_term");
        getTopArtists("long_term");
    }, [])
    function getShort() {
        console.log("getting short");
        setSingleView(true);
        setTopArtist(topShort);
    }
    function getLong() {
        setSingleView(true);
        setTopArtist(topLong);
    }
    function getLeaderboard() {
        setSingleView(false);
    }
    function getTopArtists(term) {
        $.ajax({
            url: `https://api.spotify.com/v1/me/top/artists?time_range=${term}&limit=6`,
            type: "GET",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
                setTopArtists(data.items);
                console.log(data.items);
                if (term === "short_term") {
                    setTopShort(data.items[0]);
                    setTopArtist(data.items[0]);
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
                    <TopWrapper header="Your Top Artist" headerClass="top-artist-header" getShort={getShort} getLong={getLong} getLeaderboard={getLeaderboard}>
                        <ArtistSingle name={topArtist.name} img={topArtist.images[0].url} followers={topArtist.followers.total} /> 
                    </TopWrapper> :
                    <TopWrapper header="Your Top Artists" headerClass="top-artist-header" getShort={getShort} getLong={getLong} getLeaderboard={getLeaderboard}>
                        <ArtistMultiple artists={topArtists} />
                    </TopWrapper>
            }
        </div>
    )

}
