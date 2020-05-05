import React, {useEffect} from "react";
import TopImg from "../Top/TopImg/TopImg";
import TopText from "../Top/TopText/TopText";
import "./Multiple.css";

export default function TrackMultiple({ tracks }) {
    useEffect(() => {},[])
    return (
        tracks.map((track, index) => {
            return (
                <div className="list-entry">
                    <div className="rank">
                        <h1>{index + 1}</h1>
                    </div>

                    <TopImg img={track.album.images[0].url} className="preview-img" />

                    <div className="list-details">
                        <TopText className="top-text top-track-name">{track.name}</TopText>
                        <TopText className="top-text top-album">{track.album.name}</TopText>
                        {track.artists.map((a, index) => {
                            return <TopText className="top-text top-track-artist">{(index ? ', ' : "") + a.name}</TopText>
                        })}
                    </div>
                </div>
            )
        })
    )
}
