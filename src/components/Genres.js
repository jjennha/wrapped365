import React from "react";
import * as $ from "jquery";
import { Cache } from "aws-amplify";
import Tracks from "./Tracks";

export default class Genres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            genreCount: {},
            genresSorted: [],
            displayNext: false
        }
        this.getGenres = this.getGenres.bind(this);
        this.genreView = React.createRef();
    }
    componentDidMount() {
        var _token = Cache.getItem('authToken');
        this.getGenres(_token, this.props.tracks);

    }
    async getGenres(token, tracks) {
        await tracks.forEach(el => {
            var artistUrl = el.track.artists[0].external_urls.spotify
            var aId = artistUrl.substr(artistUrl.lastIndexOf("/") + 1, artistUrl.length);
            $.ajax({
                url: `https://api.spotify.com/v1/artists/${aId}`,
                type: "GET",
                beforeSend: xhr => {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: data => {
                    console.log(data);
                    var gen = this.state.genres.concat(data.genres);
                    data.genres.forEach(g => {
                        var gcount = this.state.genreCount;
                        if (gcount[g]) {
                            gcount[g] = gcount[g] + 1;
                        } else {
                            gcount[g] = 1;
                        }
                        this.setState({ genreCount: gcount });
                    });
                },
                error: data => {
                    console.log(data)
                }
            });
        });
    }
    rank(genres) {
        var gen = Object.keys(genres);
        gen.sort((g1, g2) => {
            return genres[g2] - genres[g1];
        })
        if (gen.length > 3) {
            gen = gen.slice(0, 3);
        }
        return gen;
    }
    next() {
        this.setState({ displayNext: true }, () => {
            this.genreView.scrollIntoView({ behavior: "smooth" });
        });
    }
    render() {
        var genres = this.rank(this.state.genreCount);
        return (
            <div>
                <div className="genre-view ">
                    <div className="genre-header-text"><h1>Your top genres were</h1></div>

                    <div className="genre-content">
                        {genres.map((g, index) => {
                            return (
                                <h1 className="genre-text" key={index}>{g}</h1>
                            )
                        })}
                    </div>
                    <div className="next-container">
                        <a onClick={this.next.bind(this)} className="scroll-down"></a>
                    </div>
                </div>
                <div ref={el => this.genreView = el}>
                    {this.state.displayNext ? <Tracks /> : ""}
                </div>
            </div>

        )
    }
}
