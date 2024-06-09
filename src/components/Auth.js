import React, {useState} from 'react';
import { doSignInWithGoogle, doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword } from './firebase/auth';
import '../css/auth.css'
import google_icon from '../img/google.png'
import {app} from './firebase/firebase'; // Імпортуємо firebase об'єкт з нашого файлу firebase.js

const Auth = () => { 

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setSigningIn] = useState(true);

  const addUserToDB = (email, uid) => {
    const userRef = app.database().ref(`users/${uid}`);

    userRef.once('value', snapshot => {
        if (!snapshot.exists()) {
          userRef.set({
            email: email,
            isAdmin: false
          });
        }
    });
  }
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
        const user = await doSignInWithEmailAndPassword(email, password);
        setError('');
    } catch (error) {
        console.error("Error signing in:", error);
        setError(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
        const user = await doCreateUserWithEmailAndPassword(email, password);
        console.log("User signed in:", user);
        // Додаємо користувача до бази даних з властивістю isAdmin: false
        setError('');
        addUserToDB(email, user.uid);
    } catch (error) {
        console.error("Error signing in:", error);
        setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
        const user = await doSignInWithGoogle(email, password);
        // Додаємо користувача до бази даних з властивістю isAdmin: false
        addUserToDB(user.email, user.uid);
        setError('');
    } catch (error) {
        console.error("Error signing in:", error);
        setError(error.message);
    }
  };
  
  return (
    <section className='auth-wrapper'>
        <div className={isSigningIn ? "container" : "container right-panel-active"} id="container">
        <div className="form-container sign-up-container">
            <form action="#">
                <h1>Create Account</h1>
                <div className="social-container">
                    <a href="#/" className="social"><img src={google_icon} alt="google login"/></a>
                </div>
                <span>or use your email for registration</span>
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <span className='error'>{error}</span>
                <button onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
        <div className="form-container sign-in-container">
            <form action="#">
                <h1>Sign in</h1>
                <div className="social-container">
                    <a href="#/" className="social" onClick={handleGoogleSignIn}><img src={google_icon} alt="google login"/></a>
                </div>
                <span>or use your account</span>
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <span className='error'>{error}</span>
                <button onClick={handleSignIn}>Sign In</button>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button className="ghost" id="signIn" onClick={()=> setSigningIn(true)}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button className="ghost" id="signUp" onClick={()=> setSigningIn(false)}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    </section>
  );
};

export default Auth;
