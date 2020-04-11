import React from "react";
import * as $ from "jquery";
import hash from "./Hash";
import { Cache } from "aws-amplify";
import { Link } from "react-router-dom";
import Time from "./Time";
import "../css/Home.css"

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayNext: false,
            img: "",
            name: ""
        }
        this.timeView = React.createRef();
        this.getProfileInfo = this.getProfileInfo.bind(this);
    }
    componentDidMount() {
        var _token = Cache.getItem('authToken');
        this.setState({
            token: _token
        });
        this.getProfileInfo(_token);
    }
    clearCache() {
        Cache.clear();
        console.log("Cache cleared");
    }
    next() {
        this.setState({ displayNext: true }, () => {
            this.genreView.scrollIntoView({ behavior: "smooth" });
        });
    }
    getProfileInfo(token) {
        $.ajax({
            url: `https://api.spotify.com/v1/me`,
            type: "GET",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
                this.setState({ img: data.images[0].url });
                this.setState({ name: data.display_name });
                console.log(data);
            },
            error: data => {
                console.log(data)
                // Cache.clear();
            }
        });
    }
    getCircleStyles(item) {
        console.log(item);
        const backgroundStyles = {
            backgroundImage: `url(${
                item
                })`,
            backgroundSize: '10rem'
        }
        return backgroundStyles;
    }
    render() {
        return (
            <div className="view-container">
                <div className="header">
                    <h1 className="title">Wrapped365</h1>
                    <h4 classsName="description">Spotify Wrapped All Year Round</h4>
                </div>

                <div className="profile-container">
                    <div className="preview-img-container">
                        <div className="preview-img circle" style={this.getCircleStyles(this.state.img)} />
                    </div>
                    <div><h3>Welcome, {this.state.name}</h3></div>
                </div>
                {/* <div ref={el => this.timeView = el}>
                    {this.state.displayNext ? <Time /> : ""}
                </div> */}
            </div>
        )
    }
}

