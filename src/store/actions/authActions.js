export const signIn = ({firebase, credentials}) => {
  return (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err })
    })
  }
};

export const signOut = ({firebase}) => {
  return (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'SIGNOUT_ERROR', err })
    })
  }
};

export const signUp = ({firebase, firestore, newUser}) => {
  return (dispatch, getState) => {
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    )
      .then((resp) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0]
        })
      })
      .then(() => {
        dispatch({type: 'SIGNUP_SUCCESS' })
      })
      .catch(err => {
        dispatch({type: 'SIGNUP_ERROR', err})
      })
  }
};
