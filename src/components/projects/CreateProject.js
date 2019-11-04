import React, {useState} from 'react';
import {useFirestore} from 'react-redux-firebase';
import {createProject} from "../../store/actions/projectActions";
import {useSelector, useDispatch} from "react-redux";
import {Redirect} from 'react-router-dom';

const CreateProject = ({history}) => {

  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const auth = useSelector(({firebase}) => firebase.auth);
  const profile = useSelector(({firebase}) => firebase.profile);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    createProject({
      firestore,
      project: formData,
      profile,
      auth
    })(dispatch);
    history.push('/');
  };

  if (auth.uid) {
    return (
      <div className="container">
        <form onSubmit={handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create new project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea id="content" className="materialize-textarea" onChange={handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <Redirect to='/signin' />
    )
  }
};

export default CreateProject;

