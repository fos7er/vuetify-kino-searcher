// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, onValue, ref, set, update } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCueauyo2X7lGXSVL6LBffKLICykWlvi0c',
  authDomain: 'kino-searcher.firebaseapp.com',
  databaseURL: 'https://kino-searcher-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'kino-searcher',
  storageBucket: 'kino-searcher.appspot.com',
  messagingSenderId: '354658137429',
  appId: '1:354658137429:web:ab09736c49b81aa2d3ebdc'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

const DB = getDatabase(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

export {
  app,
  auth,
  analytics,
  DB,
  ref,
  set,
  update,
  onValue,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
}
