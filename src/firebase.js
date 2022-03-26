// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCueauyo2X7lGXSVL6LBffKLICykWlvi0c',
  authDomain: 'kino-searcher.firebaseapp.com',
  projectId: 'kino-searcher',
  storageBucket: 'kino-searcher.appspot.com',
  messagingSenderId: '354658137429',
  appId: '1:354658137429:web:ab09736c49b81aa2d3ebdc',
  measurementId: 'G-NRZ5L9M407',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

export { app, auth, analytics, createUserWithEmailAndPassword, signInWithEmailAndPassword }
