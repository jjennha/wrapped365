import React from "react";
import "./TopImg.css";

export default function TopImg ({img,className}) {
    return (
        <div className={className}>
            <img src={img} />
        </div>
    )
}