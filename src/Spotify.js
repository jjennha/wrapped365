// import React, { Component } from 'react';
// import Credentials from './credentials';
// const axios = require('axios');
// var SpotifyWebApi = require('spotify-web-api-node');
// var scopes = ['user-read-private', 'user-read-email'];
// var redirect_uri = "http://localhost:3000/callback"
// var clientId = Credentials.Spotify.Id;
// var clientSecret = Credentials.Spotify.Secret;
// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// var spotifyApi = new SpotifyWebApi({
//     clientId: Credentials.Spotify.Id,
//     clientSecret: Credentials.Spotify.Secret,
//     redirectUri: redirect_uri
//   });

// // var spotifyApi = new SpotifyWebApi();

// export const authenticate = async () => { 
//     var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
//     console.log(authorizeURL);
//     if(window.location.pathname==='/'){
//         window.location.replace(authorizeURL);
//     }else{
//         var callbackCode = window.location.search.split("?code=")[1];
//         console.log(callbackCode);
//     }
    
//     console.log(window.location.search);
// }
// export const login = () => {
//     // return spotifyApi.getMe();
// }
// var code = "";
// export const authenticate2 = async () => {
//     let url = 'http://accounts.spotify.com/authorize?client_id='+clientId+"&response_type=code&redirect_uri="+redirect_uri+"&scope=user-read-private%20user-read-email";
//     console.log(url);
//     //https://accounts.spotify.com/authorize?client_id=66b496dd7646458a874a51e419b66742&response_type=code&redirect_uri=http://localhost:3000/&scope=user-read-private%20user-read-email
//     var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
//     console.log(authorizeURL);
//     let res = await axios.get(proxyurl+authorizeURL)
//         .then(function (response) {
//             // handle success
//             console.log("success!");
//             console.log(response);
//             console.log(response.data);
//             console.log(response.data.redirect);
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
//         .then(function () {
//             // always executed
//         });
//         console.log(res);
//     if(code.length == 0){
//         // window.location.replace(url);
//         // code = window.location;
//     }
//     console.log(window.location);
    
//         // window.location = url;
//         //https://accounts.spotify.com/authorize?scope=user-read-private+user-read-email&response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3000&client_id=66b496dd7646458a874a51e419b66742#_=_
// }
// /**
//  * 
//  * https://example.com/callback?code=AQBGXp5UceZN8RctO3zdiCPsy7Cnlag9asbjGXG38UdLc--8eaHDul3TK4J7kQnq37kjGn4VPwlqkH7fKsNLDDdKgIpcDC2-4KjQWpQ0Rzyrb-sAF_q9QREU0DTDAC-MzMdtWnPDA3P1LdonWNC0FG9M2uf90u2XKYTBFh_o3y4pjAETZPaThKcP0XVppjHNgI5CS-kzJQN3UTROxuN2lltGydoRzIRrwrHagAQFIcw6hCECnGE#_=_
//  * https://accounts.spotify.com/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09
//  */