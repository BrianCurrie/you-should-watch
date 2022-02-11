import { useState, useEffect, useRef } from 'react';
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import Dropdown from './Dropdown.js';
import style from './Login.module.css';

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
    const ref = useRef();
    const [userAuth, setUserAuth] = useState();
    const [displayDropdown, setDisplayDropdown] = useState(false);

    // Auth state listener on initial mount
    useEffect(() => {
        initFirebaseAuth();
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const isOutsideClick = (e) => {
            // Check if dropdown is currently displayed, and if the click event
            // is not within the menu
            if (
                displayDropdown &&
                ref.current &&
                !ref.current.contains(e.target)
            ) {
                setDisplayDropdown(false);
            }
        };

        document.addEventListener('click', isOutsideClick);

        // Event listener cleanup
        return () => {
            document.removeEventListener('click', isOutsideClick);
        };
    }, [displayDropdown]);

    // Call authStateObserver when auth state changes
    const initFirebaseAuth = () => {
        onAuthStateChanged(getAuth(), authStateObserver);
    };

    const authStateObserver = () => {
        const currentUser = getAuth().currentUser;
        console.log('User logged in:', !!currentUser, currentUser);
        setUserAuth(currentUser);
        // setUser callback to save current user info to App.js state
        props.setUser(getImportantUserData(currentUser));
    };

    const dropdownSignOut = () => {
        setDisplayDropdown(false);
        signOutUser();
    };

    return (
        <div ref={ref} className={style.container}>
            {!!userAuth ? (
                <div className={style.user}>
                    <button
                        className={style.dropdownButton}
                        onClick={() => {
                            setDisplayDropdown(!displayDropdown);
                        }}
                    >
                        <img
                            className={style.userImg}
                            src={userAuth.photoURL}
                        />
                        <div className={style.dropdownArrow} />
                    </button>
                    <Dropdown
                        display={displayDropdown}
                        user={userAuth}
                        signOut={dropdownSignOut}
                    />
                </div>
            ) : (
                <button className={style.signInButton} onClick={signInUser}>
                    Sign In
                </button>
            )}
        </div>
    );
}
