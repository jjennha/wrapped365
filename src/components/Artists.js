import React from "react";
import * as $ from "jquery";
import '../css/Tracks.css'
import '../css/Artists.css'
import { Cache } from "aws-amplify";

export default class Artists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topArtists: []
        }
        this.getTopArtists = this.getTopArtists.bind(this);
    }
    componentDidMount() {
        var _token = Cache.getItem('authToken');
        this.setState({
            token: _token
        });
        this.getTopArtists(_token);
    }
    getTopArtists(token) {
        $.ajax({
            url: "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5",
            type: "GET",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
                console.log(data);
                this.setState({ topArtists: data.items });
            },
            error: data => {
                console.log(data);
                console.log(data.status);
                if (data.status === 401) {
                    console.log("int");
                }
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
            <div className="artist-container">
                <div className="artist-header">
                    <h1>Your Top Artists</h1>
                </div>
                <div className="artists">
                    {this.state.topArtists.map(artist => {
                        return (
                            <div className="artist">
                                <div className="artist-circle" style={this.getCircleStyles(artist)}>
                                </div>
                                <div className="artist-label"><h4>{artist.name}</h4></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}