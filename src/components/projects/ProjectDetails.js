import React from 'react';
import {useSelector} from 'react-redux';
import {useFirestoreConnect} from "react-redux-firebase";
import {Redirect} from 'react-router-dom';
import moment from 'moment';

const ProjectDetails = ({match}) => {

  useFirestoreConnect(() => [
    {
      collection: 'projects'
    }
  ]);

  const project = useSelector(
    ({firestore: {data}}) => data.projects ? data.projects[match.params.id] : null
  );
  const auth = useSelector(({firebase}) => firebase.auth);

  if (auth.uid) {
    if (project) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{project.title}</span>
              <p>{project.content}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container center">
          <p>Loading project...</p>
        </div>
      )
    }
  } else {
    return (
      <Redirect to='/signin' />
    )
  }

};

export default ProjectDetails;

