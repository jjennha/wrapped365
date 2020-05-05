import React, { useEffect } from "react";
import TopImg from "../Top/TopImg/TopImg";
import TopText from "../Top/TopText/TopText";

export default function ArtistMultiple({ artists }) {
    useEffect(() => {}, [])
    return (
        <div className="artists">
            {artists.map((artist, index) => {
                return (
                    <div className="list-entry">
                        <div className="rank">
                            <h1>{index + 1}</h1>
                        </div>
                        <TopImg img={artist.images[0].url} className="preview-img" />
                        <div className="list-details">
                            <TopText className="top-text top-artist">{artist.name}</TopText>
                            <TopText className="top-text top-text-left top-followers">{artist.followers.total + " followers"}</TopText>
                        </div>
                    </div>
                )
            })}
        </div>


    )
}
