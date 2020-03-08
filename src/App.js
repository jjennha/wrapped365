import React, { Component } from "react";
import * as $ from "jquery";
import './App.css';
import { authEndpoint, clientId, clientSecret, redirectUri, scopes } from "./config";
import hash from "./components/Hash";
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports'; // your Amplify configuration
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Three from "./components/Three";
import Leaderboard from "./components/Leaderboard";
import Two from "./components/Two";


var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirectUri
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
    };
  }
  componentDidMount() {
    console.log("hash: "+hash.access_token);
    let _token = 'BQBpx97IaiR_vu80o3OLxB_ixV2bBnA3ApS9P4Nsvzwax6tBAuqm3le3Fs76gKy44Sv61VxYrpSiXtCL6S_XNX8NsklTZTKr7RBjrHtUns0eBltAi5zAMcIEHlRi3pKwQizxIeV0dYQM5nGtDY5thZoVzeHmzT0dRnXeSUfOJjWyY-pCTJBQyz-PrLec7g';
    

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      globalToken.token = _token;
    }
    console.log(_token);
  }
  

  render() {
    return (
      <Router>
      <div className="App">
        <div className="links-container">
        <ul className="links">
            <li><Link className="btn-nav" to="/leaderboard">Leaderboard</Link></li>
            <li><Link className="btn-nav" to="/two">Two</Link></li>
            <li><Link className="btn-nav" to="/three">Three</Link></li>
        </ul>
        </div>

        
        <Switch>
          <PrivateRoute path="/leaderboard">
            <Leaderboard token={this.state.token}/>
          </PrivateRoute>
          <PrivateRoute path="/two">
            <Two token={this.state.token}/>
          </PrivateRoute>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/three">
            <Three token={this.state.token}/>
          </PrivateRoute>
        </Switch>
      </div>
        
      </Router>
    );
  }
}

export default App;

const globalToken = {
  token: null
}

const auth = {
  isAuthenticated: false,
  authenticate(cb) {
    auth.isAuthenticated = true;
    window.location.href=`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    auth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated || globalToken.token != null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.authenticate(() => {
      console.log(from);
      history.replace(from);
    });
  };

  return (
    <div className="App-header">
      {(
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
              onClick={login}
            >
              Login to Spotify
            </a>
          )}
    </div>
  );
}
/**
 * 
 * var authorizeURL = spotifyApi.createAuthorizeURL(scopes);

const oauth = {
    domain: 'http://localhost:3000/',
    scope: scopes,
    redirectSignIn: `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`,
    redirectSignOut: redirectUri,
    responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
  
}

Amplify.configure(awsconfig);
Auth.configure({oauth: oauth});
// Auth.configure({ oauth });
class App extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    // let the Hub module listen on Auth events
    Hub.listen('auth', (data) => {
        switch (data.payload.event) {
            case 'signIn':
                this.setState({authState: 'signedIn', authData: data.payload.data});
                break;
            case 'signIn_failure':
                this.setState({authState: 'signIn', authData: null, authError: data.payload.data});
                break;
            default:
                break;
        }
    });
    this.state = {
      authState: 'loading',
      authData: null,
      authError: null
    }
  }

  componentDidMount() {
    console.log('on component mount');
    // check the current user when the App component is loaded
    Auth.currentAuthenticatedUser().then(user => {
      console.log(user);
      this.setState({authState: 'signedIn'});
    }).catch(e => {
      console.log(e);
      this.setState({authState: 'signIn'});
    });
  }

  signOut() {
    Auth.signOut().then(() => {
      this.setState({authState: 'signIn'});
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    const { authState } = this.state;
    return (
      <div className="App">
        {authState === 'loading' && (<div>loading...</div>)}
        {authState === 'signIn' && <OAuthButton/>}
        {authState === 'signedIn' && <button onClick={this.signOut}>Sign out</button>}
      </div>
    );
  }
}
 */