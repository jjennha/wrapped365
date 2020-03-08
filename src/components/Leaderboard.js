import React from "react";
import * as $ from "jquery";
import '../css/Leaderboard.css'
export default class Leaderboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            topTracks: [],
            topArtists1: [],
            topArtists2: []
        }
        this.getTopTracks = this.getTopTracks.bind(this);
        this.getTopArtists = this.getTopArtists.bind(this);
    }
    componentDidMount(){
        console.log(this.props.token);
      this.setState({
        token: this.props.token
      });
      this.getTopTracks(this.props.token);
      this.getTopArtists(this.props.token);
    }
    getTopTracks(token){
        $.ajax({
            url: "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10",
            type: "GET",
            beforeSend: xhr => {
              xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => { 
                this.setState({topTracks: data.items});
                console.log(this.state.topTracks);
            },
            error: data => {console.log(data)}
          });
    }
    getTopArtists(token){
        $.ajax({
            url: "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10",
            type: "GET",
            beforeSend: xhr => {
              xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
                var even = [];
                var odd = [];
                for(var i in data.items){
                    let item = data.items[i];
                    if(i%2==0){
                        even.push(item);
                    }else{
                        odd.push(item);
                    }
                }
                this.setState({
                    topArtists1: even,
                    topArtists2: odd
                });
            },
            error: data => {console.log(data)}
          });
    }
    getCircleStyles(item) {
        const backgroundStyles = {
            backgroundImage:`url(${
              item.images[0].url
            })`,
            backgroundSize: '10rem'
        } 
        return backgroundStyles;
    }

    render() {
        return (
            <div className="leaderboard">
                <h1>Your Top 10</h1>
                <div className={"top-template"}>
                    <div className={"top-template-container left"}>
                        <div className="top-template-header">
                            <h1>Tracks</h1>
                        </div>
                        {this.state.topTracks.map((track,index) => {
                                return (
                                    <div className="top-template-entry">
                                        <div className="rank">
                                            <h1>{index+1}</h1>
                                        </div>
                                        
                                        <div className="top-template-img">
                                            <div className="preview-img">
                                                <img src={track.album.images[0].url} />
                                            </div>
                                        </div>
                                        
                                        <div className="top-template-details">
                                            <h4>
                                                {track.name}
                                            </h4>
                                            <h5>
                                                {track.album.name}
                                            </h5>
                                            {track.artists.map((a,index) => {
                                                return <label>{(index ? ', ':"") + a.name}</label>
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className={"top-template"}>
                    <div className={"top-template-container right"}>
                        <div className="top-template-header">
                            <h1>Artists</h1>
                        </div>
                        <div className="artists">
                            <div className="artists-left">
                                {this.state.topArtists1.map(artist => {
                                    return (
                                            <div className="preview-img circle" style={this.getCircleStyles(artist)}>
                                                <div className="artist-overlay">
                                                    <label>{artist.name}</label>
                                                </div>
                                            </div>
                                    )
                                })}
                            </div>
                            <div className="artists-right">
                                {this.state.topArtists2.map(artist => {
                                    return (
                                        <div className="preview-img circle" style={this.getCircleStyles(artist)}>
                                            <div className="artist-overlay">
                                                <label>{artist.name}</label>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}