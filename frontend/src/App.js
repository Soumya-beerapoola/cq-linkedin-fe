import React from 'react';
import { LinkedInApi, NodeServer } from './config';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import linkedInLoginImage from './linkedin-login-images/Retina/Sign-In-Small---Default.png';
import Home from './Home';

export default class App extends React.Component {
  initialState = {
    user: { email: {}},
    loggedIn: false
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  getUserCredentials = code => {
    const url = `${NodeServer.baseURL}${NodeServer.getUserCredentials}?code=${code}`
    debugger
    axios
      .get(url)
      .then(res => {
        const { user } = res.data;
        this.setState({
          user,
          loggedIn: true
        })
      }).catch((e) => {
        console.log(e)
      })
  };

  handlePostMessage = event => {
    if (event.data.type === 'code') {
      const { code } = event.data;
      this.getUserCredentials(code);
    }
  }

  componentDidMount() {
    window.addEventListener('message', this.handlePostMessage);
  }

  showPopup = () => {
    const { clientId, redirectUrl, oauthUrl, scope, state } = LinkedInApi;
    const oauthUrl2 = `${oauthUrl}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`;
    const width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;
    window.open(
      oauthUrl2,
      'Linkedin',
      'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' +
      width +
      ', height=' +
      height +
      ', top=' +
      top +
      ', left=' +
      left
    );
  };

  render() {
    const { loggedIn, user } = this.state;
    const contentWhenLoggedIn = (
      <>
        <div>after login</div>
        <img src={user.profileImageURL} alt="Profile image" />
        <h3>{`${user.firstName} ${user.lastName}`}</h3>
        <h3>{user.email.emailAddress}</h3>
      </>
    );
    const contentWhenLoggedOut = (
      <>
        <h2>Sign in with LinkedIn - 1</h2>
        <img src={linkedInLoginImage} alt="Sign in with LinkedIn" onClick={this.showPopup} />
      </>
    );
    return (
      <div>

        {loggedIn && user !== {} ? contentWhenLoggedIn : contentWhenLoggedOut}

      </div>
    )
  };
}