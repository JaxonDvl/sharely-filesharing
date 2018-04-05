import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAXoBgUNmSCYPZjVIk0n2jzxtIywXu4FDk",
    authDomain: "sharely-filesharing.firebaseapp.com",
    databaseURL: "https://sharely-filesharing.firebaseio.com",
    projectId: "sharely-filesharing",
    storageBucket: "sharely-filesharing.appspot.com",
    messagingSenderId: "440466367768"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};