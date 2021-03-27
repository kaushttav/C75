import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAhlKwkqpq6bzcJ6tgDj3iWJTD1beETP54",
    authDomain: "bed-time-stories-ffc00.firebaseapp.com",
    projectId: "bed-time-stories-ffc00",
    storageBucket: "bed-time-stories-ffc00.appspot.com",
    messagingSenderId: "1054887062429",
    appId: "1:1054887062429:web:6b8af4d1f776dcb8105d74"
  };

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();