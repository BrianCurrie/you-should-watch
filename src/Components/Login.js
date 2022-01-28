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

export default function Login() {
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
        console.log(
            'User logged in:',
            !!getAuth().currentUser,
            getAuth().currentUser
        );
        setIsLoggedIn(!!getAuth().currentUser);
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
