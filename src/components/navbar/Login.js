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

function signInUser() {
    let provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account',
    });
    const auth = getAuth();
    signInWithPopup(auth, provider);
}

function signOutUser() {
    const auth = getAuth();
    signOut(auth);
}

function getImportantUserData(user) {
    // If user is signed in
    if (user) {
        const uid = user.uid;
        const name = user.displayName;
        const profilePic = user.photoURL;

        return { uid, name, profilePic };
    } else {
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
        setUserAuth(currentUser);
        // setUser callback to save current user info to App.js state
        props.setUser(getImportantUserData(currentUser));
    };

    const dropdownSignOut = () => {
        setDisplayDropdown(false);
        signOutUser();
    };

    return (
        <div className={style.mainContainer}>
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
                                alt="User"
                                src={userAuth.photoURL}
                            />
                            <div className={style.dropdownArrow} />
                        </button>
                        <Dropdown
                            display={displayDropdown}
                            user={userAuth}
                            signOut={dropdownSignOut}
                            hideDropdown={() => setDisplayDropdown(false)}
                        />
                    </div>
                ) : (
                    <button className={`btn`} onClick={signInUser}>
                        Sign In
                    </button>
                )}
            </div>
            <div className={style.mobileContainer}>
                {!!userAuth ? (
                    <div className={style.dropdownContainer}>
                        <div className={style.userMobile}>
                            <img
                                className={style.userImg}
                                alt="User"
                                src={userAuth.photoURL}
                            />
                            <div className={style.usernameMobile}>
                                {userAuth.displayName}
                            </div>
                        </div>
                        <hr className={style.mobileRowLine} />
                        <button
                            className={style.mobileBtn}
                            onClick={props.createListOnClick}
                        >
                            Create List
                        </button>
                        <hr className={style.mobileRowLine} />
                        <button
                            className={style.mobileBtn}
                            onClick={() => props.myListsOnClick(userAuth.uid)}
                        >
                            My Lists
                        </button>
                        <hr className={style.mobileRowLine} />
                        <button
                            className={style.mobileBtn}
                            onClick={signOutUser}
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className={style.dropdownContainerSignedOut}>
                        <hr className={style.mobileRowLine} />
                        <button
                            className={style.mobileBtn}
                            onClick={signInUser}
                        >
                            Sign In
                        </button>
                        <hr className={style.mobileRowLine} />
                        <button
                            onClick={props.createListOnClick}
                            className={style.mobileBtn}
                        >
                            Create List
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
