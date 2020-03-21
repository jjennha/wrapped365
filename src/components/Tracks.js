import React from "react";
import * as $ from "jquery";
import '../css/Tracks.css'
// import '.././App.css'
import { Cache } from "aws-amplify";

export default class Tracks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topTracks: []
        }
        this.getTopTracks = this.getTopTracks.bind(this);
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
            this.genreView.scrollIntoView({ behavior: "smooth" });
        });
    }

    render() {
        return (
            <div className="view-container">
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
                                    <h4>
                                        {track.name}
                                    </h4>
                                    <h5>
                                        {track.album.name}
                                    </h5>
                                    {track.artists.map((a, index) => {
                                        return <label>{(index ? ', ' : "") + a.name}</label>
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
                
            </div>
        )
    }
}