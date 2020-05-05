import React, { useState, useEffect } from "react";
import * as $ from "jquery";
import { Cache } from "aws-amplify";
import TopHeader from "../../Top/TopHeader/TopHeader";
import TopText from "../../Top/TopText/TopText";
import "./Genres.css"

export default function Genres({ tracks, errorHandler }) {
    const [token] = useState(Cache.getItem('authToken'));
    const [genreDisplay, setGenreDisplay] = useState([{ name: "", count: 0 }]);
    const [genreCount, setGenreCount] = useState({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getGenres(tracks);
    }, [tracks]);

    function rank(gc) {
        var keys = Object.keys(gc);
        var t = 0;
        var display = [];
        keys = keys.sort((g1, g2) => {
            return gc[g2] - gc[g1];
        }).slice(0, 3);
        keys.forEach(k => {
            t += gc[k];
            display.push({ name: k, count: gc[k] });
        })
        setGenreDisplay(display);
        setTotal(t);
        return keys;
    }
    function getGenres(t) {
        t.forEach(el => {
            var artistUrl = el.track.artists[0].external_urls.spotify
            var aId = artistUrl.substr(artistUrl.lastIndexOf("/") + 1, artistUrl.length);
            $.ajax({
                url: `https://api.spotify.com/v1/artists/${aId}`,
                type: "GET",
                beforeSend: xhr => {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: data => {
                    let gcount = genreCount;
                    data.genres.forEach((x) => { gcount[x] = (gcount[x] || 0) + 1; });
                    rank(genreCount);
                },
                error: data => {
                    errorHandler(data);
                }
            });
        });
    }
    return (
            <div className="entry-container">
                <TopHeader headerClass={"genre-header"}>Your Recent Listening</TopHeader>
                {genreDisplay.map((g, index) => {
                    return (
                        <span className="genre-bar">
                            <TopText className="genre-percent">{Math.round(g.count / total * 100)}%</TopText>
                            <TopText className="genre-fill" style={{ '--fill': `${((1.5 * g.count) / total) * 100}%` }}> {g.name}</TopText>
                        </span>
                    )
                })}
            </div>
    )
}
