import firebase from 'firebase'
import "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyAaZjCwVKl6tEGuNT4FzPLBPKxMSAf3T_Q",
  authDomain: "finalweb-af59f.firebaseapp.com",
  databaseURL: "https://finalweb-af59f-default-rtdb.firebaseio.com",
  projectId: "finalweb-af59f",
  storageBucket: "finalweb-af59f.appspot.com",
  messagingSenderId: "137249085590",
  appId: "1:137249085590:web:93eaa30c4021a80cc60ab7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
