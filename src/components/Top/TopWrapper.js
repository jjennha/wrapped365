import React from "react";
import TopHeader from "./TopHeader/TopHeader";

export default function TopWrapper({ header, headerClass, getShort, getLong, getLeaderboard, children }) {
    return (
        <div className="app-container">
            <div className="display-options">
                <a onClick={() => getShort()} href="#">Recent</a>
                <a onClick={() => getLong()} href="#">All-Time</a>
                <a onClick={() => getLeaderboard()} href="#">Leaderboard</a>
            </div>
            <div className="entry-container">
                <TopHeader headerClass={headerClass}>{header}</TopHeader>
                {children}
            </div>
        </div>
    )
}