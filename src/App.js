import React, { Component } from "react";
import * as $ from "jquery";
import './App.css';
import { authEndpoint, clientId, redirectUri, scopes } from "./config_dev";
import hash from "./components/Hash";
import { Cache } from 'aws-amplify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Genres from "./components/Genres";
import Leaderboard from "./components/Leaderboard";
import Homepage from "./components/Homepage";
import Time from "./components/Time";
import Tracks from "./components/Tracks";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      rToken: null
    };
  }
  componentDidMount() {
    let _token = hash.access_token;

    var t = Cache.getItem('authToken');
    if(t==null && _token){
      const date = new Date();
      const expiration = date.getTime() + 60*60*1000;
      Cache.setItem('authToken',hash.access_token, {expires: expiration});
      this.setState({
        token: _token
      });
    }else if(t){
      this.setState({
        token: t
      });
    }

    console.log(t);
  }

  render() {
    return (
      <Router>
      <div className="App">
        <div className="links-container">
        <ul className="links">
            <li><Link className="btn-nav" to="/">Home</Link></li>
            <li><Link className="btn-nav" to="/leaderboard">Leaderboard</Link></li>
            <li><Link className="btn-nav" to="/time">Time</Link></li>
            <li><Link className="btn-nav" to="/tracks">Tracks</Link></li>
        </ul>
        </div>
        
        <Switch>
          
          <PrivateRoute path="/leaderboard">
            <Leaderboard/>
          </PrivateRoute>
          <PrivateRoute path="/time">
            <Time token={this.state.token}/>
          </PrivateRoute>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/tracks">
            <Tracks/>
          </PrivateRoute>
          <Route path="/">
            <Homepage/>
          </Route>
        </Switch>
      </div>
        
      </Router>
    );
  }
}

export default App;


const auth = {
  authenticate(cb) {
    const date = new Date();
    const expiration = date.getTime() + 60*60*1000;
    Cache.setItem("authenticated",true,{expires: expiration});

    window.location.href=`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`;
    setTimeout(cb, 100); 
  },
  signout(cb) {
    setTimeout(cb, 100);
  }
};
export function getRefreshToken(token){
  console.log("get refresh");
  $.ajax({
    url: `https://api.spotify.com/api/token?grant_type=authorization_code&code=${token}&redirect_uri=${redirectUri}`,
    type: "POST",
    beforeSend: xhr => {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: data => {
        console.log(data)
    },
    error: data => {console.log(data)}
  });
}
// Check if access token is valid here
function PrivateRoute({ children, ...rest }) {
  var isAuthenticated = Cache.getItem('authenticated');
  var token = Cache.getItem('authToken');

  console.log("PrivateRoute - authenticated? "+isAuthenticated);
  console.log("PrivateRoute - global: "+token);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated? (
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