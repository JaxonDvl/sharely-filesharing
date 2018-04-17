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

export const getUserSharedFiles =  async (owner) =>{
  let sharedRef = null;
  let fileMapping = {};
  await db.ref(`share/${owner}`).once('value').then(snapshot =>{
 
    sharedRef=snapshot.val();
    Object.keys(sharedRef).forEach(function(key){
      db.ref(`files/${sharedRef[key]["fromUser"]}`).once('value').then(fileSnapshot => {
        let refFiles = fileSnapshot.val();
        fileMapping[key] = refFiles[key]
        debugger;
        // console.log(fileMapping);
        // return fileMapping
      });
    })

  }).then(()=>{
    
  });
  return fileMapping;
}

export const addFile = (owner, filename) => {
  getUserFiles(owner).then(snapshot => {
    
    
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