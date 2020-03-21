import React from "react";
import * as $ from "jquery";
import hash from "./Hash";
import { Cache } from "aws-amplify";

export default class Homepage extends React.Component {
    constructor(props){
        super(props);
    }
    clearCache(){
        Cache.clear();
        console.log("Cache cleared");
    }
    render() {
        return (
            <div className="view-container">Home
                <button className="btn" onClick={this.clearCache}>
                    Clear Cache
                </button>
            </div>
        )
    }
}