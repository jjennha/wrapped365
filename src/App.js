import React, { Component } from "react";
import * as $ from "jquery";
import './Imports';
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./components/Hash";
import { Cache } from 'aws-amplify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Time from "./components/Time";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      rToken: null,
      displayNext: false,
      img: "",
      name: ""
    };
    this.getProfileInfo = this.getProfileInfo.bind(this);
    this.timeView = React.createRef();
    this.next = this.next.bind(this);
  }
  componentDidMount() {
    let _token = hash.access_token;

    var t = Cache.getItem('authToken');
    if (t == null && _token) {
      const date = new Date();
      const expiration = date.getTime() + 60 * 60 * 1000;
      Cache.setItem('authToken', hash.access_token, { expires: expiration });
      this.setState({
        token: _token
      });
      this.getProfileInfo(_token);
    } else if (t) {
      this.setState({
        token: t
      });
      this.getProfileInfo(t);
    }
    console.log(t);
  }
  getProfileInfo(token) {
    $.ajax({
      url: `https://api.spotify.com/v1/me`,
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({ img: data.images[0].url });
        this.setState({ name: data.display_name });
        console.log(data);
      },
      error: data => {
        console.log(data)
         Cache.clear();
      }
    });
  }
  getCircleStyles(item) {
    console.log(item);
    const backgroundStyles = {
      backgroundImage: `url(${
        item
        })`,
      backgroundSize: '5em'
    }
    return backgroundStyles;
  }
  next() {
    this.setState({ displayNext: true }, () => {
      this.timeView.scrollIntoView({ behavior: "smooth" });
    });
  }
  render() {
    return (
      <Router>
        <div className="App-container">
          <div className="App">
            <div className="header">
              <h1 className="title">Wrapped
              <h1 className="title title-detail">365</h1>
                <h4 className="description">Spotify Wrapped All Year Round.</h4>
              </h1>
            </div>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <PrivateRoute path="/">
                <div className="profile-container">
                  <div className="preview-img-container">
                    <div className="preview-img circle" style={this.getCircleStyles(this.state.img)} />
                  </div>
                  <div><h3>Welcome, {this.state.name}</h3></div>
                </div>
                <div className="next-container">
                  <a onClick={this.next.bind(this)} className="scroll-down"></a>
                </div>
              </PrivateRoute>
            </Switch>

          </div>
        </div>
        <div ref={el => this.timeView = el}>
          {this.state.displayNext ? <Time tracks={this.state.todaysTracks} /> : ""}
        </div>
      </Router>

    );
  }
}

export default App;


const auth = {
  authenticate(cb) {
    const date = new Date();
    const expiration = date.getTime() + 60 * 60 * 1000;
    Cache.setItem("authenticated", true, { expires: expiration });

    window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`;
    setTimeout(cb, 100);
  },
  signout(cb) {
    setTimeout(cb, 100);
  }
};
export function getRefreshToken(token) {
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
    error: data => { console.log(data) }
  });
}
// Check if access token is valid here
function PrivateRoute({ children, ...rest }) {
  var isAuthenticated = Cache.getItem('authenticated');
  var token = Cache.getItem('authToken');

  console.log("PrivateRoute - authenticated? " + isAuthenticated);
  console.log("PrivateRoute - global: " + token);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
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
    <div className="login">
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
