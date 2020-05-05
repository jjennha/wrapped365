import React, { useEffect } from "react";
import TopImg from "../Top/TopImg/TopImg";
import TopText from "../Top/TopText/TopText";
import "./Single.css";

export default function Single({ name, img, followers }) {
    useEffect(() => { }, [])
    return (
        <div className="single-content-view">
            <div className="details-single details-artist">
                <TopText className="top-text top-text-right top-artist-name">{name}</TopText>
                <TopText className="top-text top-text-right top-followers">{followers + " followers"}</TopText>
            </div>
            <TopImg img={img} className="preview-img-large" />
        </div>
    )
}


