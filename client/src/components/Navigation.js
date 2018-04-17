import React from 'react';
import { Link } from 'react-router-dom';
import "./Navigation.css";

import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = () =>
<AuthUserContext.Consumer>
  {authUser => authUser
    ? <NavigationAuth />
    : <NavigationNonAuth />
  }
</AuthUserContext.Consumer>

const NavigationAuth = () =>
  <ul className="nav">
    <li><Link to={routes.SHARE}>Share</Link></li>
    <li><Link to={routes.MYFILES}>MyFiles</Link></li>
    <li><Link to={routes.HOME}>Upload</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul className="nav">
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

export default Navigation;