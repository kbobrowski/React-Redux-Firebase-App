import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';
import {signUp} from "../../store/actions/authActions";
import {useFirebase, useFirestore} from "react-redux-firebase";
import {useDispatch} from "react-redux";

const SignUp = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    lastName: '',
    firstName: ''
  });

  const auth = useSelector(({firebase}) => firebase.auth);
  const authError = useSelector(({auth}) => auth.authError);

  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
    signUp({
      firebase,
      firestore,
      newUser: formData
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
            <input type="email" id="email" onChange={handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default SignUp;
