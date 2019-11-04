export const createProject = ({firestore, project, profile, auth}) => {
  return (dispatch, getState) => {
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: auth.uid,
      createdAt: new Date()
    })
      .then(() => {
        dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
    })
  }
};

