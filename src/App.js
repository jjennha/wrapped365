import React, { useState, useEffect} from "react";
import * as $ from "jquery";
import hash from "./components/Hash";
import { Cache } from 'aws-amplify';
import {
  BrowserRouter as Router
} from "react-router-dom";
import Tracks from "./components/Tracks/Tracks"
import Artists from "./components/Artists/Artists";
import Login from "./components/Login/Login";
import "./App.css";
import Recent from "./components/Recent/Recent";


function Profile(props) {
  return (
      <h4 className="user-title">Let's get started, {props.user}</h4>
  )
}

export default function App() {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setAuth] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    let _token = hash.access_token;
    var cachedToken = Cache.getItem('authToken');
    if(cachedToken){
      setToken(cachedToken);
      setAuth(true);
    }else if (!isAuthenticated && _token) {
      Cache.setItem('authToken', _token);
      setToken(_token);
      setAuth(true);
    }
    if(token){
      getProfileInfo();
    }
  }, [isAuthenticated])

  function errorHandler(data) {
    console.log(data);
    if (data.status === 401) {
      Cache.clear();
      setAuth(false);
    }
  }

  function getProfileInfo() {
    $.ajax({
      url: `https://api.spotify.com/v1/me`,
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        setUserName(data.display_name);
      },
      error: data => {
        errorHandler(data);
      }
    });
  }
  return (
    <Router>
        <div className="App">
            <h1 className="title">Wrapped
              <h1 className="title title-detail">365</h1>
              <h4 className="description">Spotify Wrapped All Year Round.</h4>
              {isAuthenticated ? <Profile user={userName} /> : <Login />}
            </h1>
        </div>
      {isAuthenticated ?
        <div >
          <Tracks errorHandler={errorHandler}/>
          <Artists errorHandler={errorHandler}/>
          <Recent errorHandler={errorHandler}/>
        </div>
        : ""}

    </Router>

  );
}
