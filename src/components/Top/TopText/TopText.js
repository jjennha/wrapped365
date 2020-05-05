import React from "react";
import "./TopText.css";

export default function TopText({className,style,children}) {
    return (
        <h3 className={className} style={style}>
            {children}
        </h3>
    )
}