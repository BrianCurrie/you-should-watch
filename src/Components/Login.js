import { useState, useEffect } from 'react';

import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

async function signInUser() {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
}

function signOutUser() {
    signOut(getAuth());
}

function getImportantUserData(user) {
    if (user) {
        // If user is signed in
        const uid = user.uid;
        const name = user.displayName;
        const profilePic = user.photoURL;

        return { uid, name, profilePic };
    } else {
        // If user is not signed in
        return null;
    }
}

export default function Login(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Auth state listener on initial mount
    useEffect(() => {
        initFirebaseAuth();
    }, []);

    // Call authStateObserver when auth state changes
    const initFirebaseAuth = () => {
        onAuthStateChanged(getAuth(), authStateObserver);
    };

    const authStateObserver = () => {
        const currentUser = getAuth().currentUser;
        console.log('User logged in:', !!currentUser, currentUser);
        setIsLoggedIn(!!currentUser);
        // setUser callback to save current user info to App.js state
        props.setUser(getImportantUserData(currentUser));
    };

    return (
        <div>
            {isLoggedIn ? (
                <span>
                    {getAuth().currentUser.displayName}
                    <img
                        style={{ height: 50, width: 50, borderRadius: 100 }}
                        src={getAuth().currentUser.photoURL}
                    />
                </span>
            ) : null}
            {isLoggedIn ? (
                <button onClick={signOutUser}>Sign Out</button>
            ) : (
                <button onClick={signInUser}>Sign In</button>
            )}
        </div>
    );
}
