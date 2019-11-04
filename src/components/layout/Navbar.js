import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import {useSelector} from 'react-redux';

const Navbar = () => {
  const auth = useSelector(({firebase}) => firebase.auth);
  const profile = useSelector(({firebase}) => firebase.profile);

  const links = () => auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks/>;

  return (
    <nav className="nav-wrapper grey darken-3">
      {links()}
      <div className="container">
        <Link to="/" className="brand-logo">MarioPlan</Link>
      </div>
    </nav>
  )
};

export default Navbar;