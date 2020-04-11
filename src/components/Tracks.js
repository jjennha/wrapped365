import React from "react";
import * as $ from "jquery";
import '../css/Tracks.css'
// import '.././App.css'
import { Cache } from "aws-amplify";
import Artists from "./Artists";

export default class Tracks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topTracks: []
        }
        this.getTopTracks = this.getTopTracks.bind(this);
        this.next = this.next.bind(this);
        this.artistView = React.createRef();
    }
    componentDidMount() {
        var _token = Cache.getItem('authToken');
        this.setState({
            token: _token
        });
        this.getTopTracks(_token);
    }
    getTopTracks(token) {
        $.ajax({
            url: "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
            type: "GET",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
                this.setState({ topTracks: data.items });
                console.log(this.state.topTracks);
            },
            error: data => {
                console.log(data.status)
                // Cache.clear();
            }
        });
    }

    getCircleStyles(item) {
        const backgroundStyles = {
            backgroundImage: `url(${
                item.images[0].url
                })`,
            backgroundSize: '10rem'
        }
        return backgroundStyles;
    }

    next() {
        this.setState({ displayNext: true }, () => {
            this.artistView.scrollIntoView({ behavior: "smooth" });
        });
    }

    render() {
        return (
            <div className="trackview-container">
                <div className={"track-container"}>
                    <div className="track-header">
                        <h1>Your Top Songs</h1>
                    </div>
                    <div className="entry-container">
                    {this.state.topTracks.map((track, index) => {
                        return (
                            <div className="track-entry">
                                <div className="rank">
                                    <h1>{index + 1}</h1>
                                </div>

                                <div className="track-img">
                                    <div className="preview-img">
                                        <img src={track.album.images[0].url} />
                                    </div>
                                </div>

                                <div className="track-details">
                                    <h3>
                                        {track.name}
                                    </h3>
                                    <h4>
                                        {track.album.name}
                                    </h4>
                                    {track.artists.map((a, index) => {
                                        return <h5>{(index ? ', ' : "") + a.name}</h5>
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    <div className="next-container">
                        <a onClick={this.next.bind(this)} className="scroll-down track-scroll"></a>
                    </div>
                    
                </div>
                <div ref={el => this.artistView = el}>
                {/* <Genres tracks={this.state.todaysTracks}/> */}
                    {this.state.displayNext ? <Artists/> : ""}
                </div>
            </div>
        )
    }
}