import React, {useEffect} from "react";
import TopImg from "../Top/TopImg/TopImg";
import TopText from "../Top/TopText/TopText";
import "./Single.css";

export default function Single({name, album, img, artists}) {
    useEffect(() => {},[])
    return (
        <div className="single-content-view">
            <TopImg img={img} className="preview-img-large"/>
            <div className="details-single">
                <TopText className="top-text top-track-name">{name}</TopText>
                <TopText className="top-text top-album">{album}</TopText>
                {artists.map((a, index) => {
                    return <TopText className="top-text top-track-artist">{(index ? ', ' : "") + a.name}</TopText>
                })}
            </div>
        </div>
    )
}


