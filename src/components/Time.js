import React from "react";
import * as $ from "jquery";
import { Cache } from "aws-amplify";
import Genres from "./Genres";

export default class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todaysTracks: [],
            minutes: 0,
            displayNext: false
        }
        this.getTodaysTracks = this.getTodaysTracks.bind(this);
        this.next = this.next.bind(this);
        this.genreView = React.createRef();
    }
    componentDidMount() {
        var _token = Cache.getItem('authToken');
        const after = this.getYesterday();
        this.getTodaysTracks(_token, after);
    }
    getYesterday() {
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 2)

        return yesterday.getTime();
    }
    getTodaysTracks(token, after) {
        $.ajax({
            url: `https://api.spotify.com/v1/me/player/recently-played?after=${after}`,
            type: "GET",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
                var tracks = data.items;
                if (tracks.length == 0) return;

                var t = this.state.todaysTracks;
                t = t.concat(tracks);

                var sum = this.state.minutes;
                tracks.forEach(tr => {
                    sum += tr.track.duration_ms / 1000 / 60;
                });
                sum = Math.round(sum);

                this.setState({ todaysTracks: t });
                this.setState({ minutes: sum });

                this.getTodaysTracks(token, data.cursors.after);
                console.log(this.state.todaysTracks);
                console.log(this.state.minutes);
            },
            error: data => {
                console.log(data)
                Cache.clear();
            }
        });
    }
    next() {
        this.setState({ displayNext: true }, ()=>{
            this.genreView.scrollIntoView({ behavior: "smooth" });
        });
    }
    render() {
        return (
            <div>
                <div className="time-view">
                    <div className="time-text">
                        <div className="header-text">
                            <h1>you've listened for</h1>
                        </div>
                        <div className="time-container">
                            <h1>{this.state.minutes}</h1>
                        </div>
                        <div className="footer-text">
                            <h1>minutes today...</h1>
                        </div>
                        <div className="next-container">
                            <a onClick={this.next.bind(this)} className="scroll-down"></a>
                        </div>
                    </div>

                </div>
                <div ref={el => this.genreView = el}>
                {/* <Genres tracks={this.state.todaysTracks}/> */}
                    {this.state.displayNext ? <Genres tracks={this.state.todaysTracks}/> : ""}
                </div>

            </div>

        )
    }
}