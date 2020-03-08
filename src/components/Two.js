import React from "react";
import Player from "./Player";

export default class Two extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                Two
                <Player token={this.props.token}/>
            </div>
        )
    }
}