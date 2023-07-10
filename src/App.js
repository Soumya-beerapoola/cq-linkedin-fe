import React, { useEffect, useState } from 'react';
import { LinkedInApi, NodeServer } from './config';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import linkedInLoginImage from './linkedin-login-images/Retina/Sign-In-Small---Default.png';
import Home from './Home';

const initialState = { user: { email: {} }, loggedIn: false };

const App = () => {
  const [state, setState] = useState(initialState)
  const navigate = useNavigate();
  const location = useLocation();

  const getUserCredentials = code => {
    const url = `${NodeServer.baseURL}${NodeServer.getUserCredentials}?code=${code}`
    axios
      .get(url)
      .then(res => {
        const { user } = res.data;
        setState({
          user,
          loggedIn: true
        })
      }).catch((e) => {
        console.log(e)
      })
  };

  const handlePostMessage = event => {
    if (event.data.type === 'code') {
      const { code } = event.data;
      getUserCredentials(code);
    }
  }

  useEffect(() => {
    if(location.state) {
      const { code } = location.state;
      console.log('>>>>>> State:', location.state)
      getUserCredentials(code);
    }
  }, [location])

  const showPopup = () => {
    const { clientId, redirectUrl, oauthUrl, scope, state } = LinkedInApi;
    const oauthUrl2 = `${oauthUrl}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`;
    // navigate(oauthUrl2, { replace: true });
    window.location.replace(oauthUrl2)
  }

  const { loggedIn, user } = state;
  const contentWhenLoggedIn = () => (
    <>
      <div>after login</div>
      <img src={user.profileImageURL} alt="Profile image" />
      <h3>{`${user.firstName} ${user.lastName}`}</h3>
      <h3>{user.email.emailAddress}</h3>
    </>
  );
  const contentWhenLoggedOut = () => (
    <>
      <h2>Sign in with LinkedIn - 1</h2>
      <img src={linkedInLoginImage} alt="Sign in with LinkedIn" onClick={showPopup} />
    </>
  );

  return (
    <div>
      {loggedIn && user !== {} ? contentWhenLoggedIn() : contentWhenLoggedOut()}
    </div>
  )
}

export default App;

