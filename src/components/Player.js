import React from "react";
import * as $ from "jquery";

export default class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0,
      response: '',
      post: '',
      responseToPost: '',
    };
     this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  componentDidMount(){
      console.log(this.props.token);
      this.setState({
        token: this.props.token
      });
      this.getCurrentlyPlaying(this.props.token);
  }
  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        if(data){
          this.setState({
            item: data.item,
            is_playing: data.is_playing,
            progress_ms: data.progress_ms
          });
        }
      }
    });
  }
  render(){
    var props = this.props;
    var state = this.state;
    const backgroundStyles = (state.item)? {
      backgroundImage:`url(${
        state.item.album.images[0].url
      })`,
    } : {
      backgroundImage:``};
  
    // const progressBarStyles = (state.item && state.progress_ms)? {
    //   width: (state.progress_ms * 100 / props.item.duration_ms) + '%'
    // } : {
    //   width: 0
    // };
    console.log(this.state.item);
    return (
      (this.state.item) && (
      <div className="App">
        <div className="main-wrapper">
          <div className="now-playing__img">
            <img src={this.state.item.album.images[0].url} />
          </div>
          <div className="now-playing__side">
            <div className="now-playing__name">{state.item.name}</div>
            <div className="now-playing__artist">
              {this.state.item.artists[0].name}
            </div>
            <div className="now-playing__status">
              {this.state.is_playing ? "Playing" : "Paused"}
            </div>
            <div className="progress">
              <div className="progress__bar"  />
            </div>
          </div>
          <div className="background" style={backgroundStyles} />{" "}
        </div>
      </div>
    )  );
  }
  
}
