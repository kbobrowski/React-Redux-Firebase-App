import React from 'react';
import {NavLink} from 'react-router-dom';
import {signOut} from '../../store/actions/authActions';
import {useFirebase, isLoaded} from "react-redux-firebase";
import {useDispatch} from "react-redux";

const SignedInLinks = ({profile}) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  return (
    <ul className="right">
      <li><NavLink to="/create">New Project</NavLink></li>
      <li><a onClick={() => signOut({firebase})(dispatch)}>Log Out</a></li>
      {isLoaded(profile) && <li><NavLink to="/" className="btn btn-floating pink lighten-1">{profile.initials}</NavLink></li>}
    </ul>
  )
};

export default SignedInLinks;
