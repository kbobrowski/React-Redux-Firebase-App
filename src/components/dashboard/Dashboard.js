import React from 'react';
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import {useSelector} from 'react-redux';
import {useFirestoreConnect} from "react-redux-firebase";
import {Redirect} from 'react-router-dom';

const Dashboard = () => {
  useFirestoreConnect(() => [
    {
      collection: 'projects',
      orderBy: ['createdAt', 'desc']
    },
    {
      collection: 'notifications',
      limit: 3,
      orderBy: ['time', 'desc']
    }
  ]);

  const projects = useSelector(({firestore}) => firestore.ordered.projects);
  const auth = useSelector(({firebase}) => firebase.auth);
  const notifications = useSelector(({firestore}) => firestore.ordered.notifications);

  if (auth.uid) {
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects}/>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications}/>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <Redirect to='/signin' />
    )
  }
};

export default Dashboard;

