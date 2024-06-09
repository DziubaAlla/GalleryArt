import { auth } from './firebase';

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export const doCreateUserWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            resolve(user); // Resolve with user data
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            reject(error); // Reject with error
        });
    });
};
export const doSignInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            resolve(user); // Resolve with user data
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            reject(error); // Reject with error
        });
    });
};


export const doSignInWithGoogle = async () =>{
    const provider = new GoogleAuthProvider();
     return new Promise((resolve, reject) => {
        signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        resolve(user);
        }).catch((error) => {
        // Handle Errors here.
        reject(error.message);
        // ...
        });;
     })
}

export const doSignOut = () => {
    return auth.signOut();
}