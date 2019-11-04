import React, {useState} from 'react';
import {signIn} from "../../store/actions/authActions";
import {useFirebase} from "react-redux-firebase";
import {useSelector, useDispatch} from "react-redux";
import {Redirect} from 'react-router-dom';

const SignIn = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const firebase = useFirebase();
  const dispatch = useDispatch();

  const authError = useSelector(({auth}) => auth.authError);
  const auth = useSelector(({firebase}) => firebase.auth);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    signIn({
      firebase,
      credentials: formData
    })(dispatch);
  };

  if (auth.uid) {
    return (
      <Redirect to='/' />
    )
  } else {
    return (
      <div className="container">
        <form onSubmit={handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign In</button>
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default SignIn;
