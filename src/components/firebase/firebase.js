// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyABy-Yl6vKYFTL7bGBQmC9BDprbPDzenns",
  authDomain: "gallery-72153.firebaseapp.com",
  projectId: "gallery-72153",
  storageBucket: "gallery-72153.appspot.com",
  messagingSenderId: "234616956446",
  appId: "1:234616956446:web:e4572bf6d9fb1bb3d0700f",
  measurementId: "G-8K1JS6TWGJ"
};
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app, auth};
