import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const getUserFiles = (owner) =>
  db.ref(`files/${owner}`).once('value');

export const addFile = (owner, filename) => {
  getUserFiles(owner).then(snapshot => {
    console.log(snapshot.val());
    
  });

  let fileRef = db.ref(`files/${owner}`);
  let newFile = fileRef.push();
  newFile.set({
    owner,
    filename
  })
}

export const shareFile = (toUser,fromUser,key) => {


  let fileRef = db.ref(`share/${toUser}/${key}`);
  //let newFile = key;
  fileRef.set({
    fromUser
  })
}

// Other Entity APIs ...