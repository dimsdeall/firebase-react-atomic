import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCBzTxJqq3x3aaov4kfgI-ih_ymqTDPuUA",
    authDomain: "simple-notes-react-b2da2.firebaseapp.com",
    projectId: "simple-notes-react-b2da2",
    storageBucket: "simple-notes-react-b2da2.appspot.com",
    messagingSenderId: "589744547889",
    appId: "1:589744547889:web:674d800f48a8d84b5a0d10",
    measurementId: "G-G745ZG8V3W"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const database = firebase.database()

export default firebase;