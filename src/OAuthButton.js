import React, { Component } from "react";
import Amplify, { Auth, Hub } from 'aws-amplify';
import { withOAuth } from 'aws-amplify-react';

class OAuthButton extends Component {
  render() {
    return (
      <button onClick={this.props.OAuthSignIn}>
        Sign in with AWS
      </button>
    )
  }
}

export default withOAuth(OAuthButton);