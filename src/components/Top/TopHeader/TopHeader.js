import React from "react";
import "./TopHeader.css";

export default function TopHeader({headerClass,children}) {
    return (
        <div className={"top-header-container"}>
            <h1 className={`top-header ${headerClass}`}>{children}</h1>
        </div>
    )
}
