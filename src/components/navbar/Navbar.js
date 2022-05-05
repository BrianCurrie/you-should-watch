import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login.js';

import style from './Navbar.module.css';
import { ReactComponent as Hamburger } from '../../imgs/icons/hamburger.svg';
import { ReactComponent as Close } from '../../imgs/icons/close.svg';

export default function Navbar(props) {
    let navigate = useNavigate();

    const [mobileDropdownState, setMobileDropdownState] = useState(false);

    const createListNavigate = () => {
        navigate('/create');
    };

    const homepageNavigate = () => {
        navigate('/');
    };

    const mobileMenuBtnClick = () => {
        setMobileDropdownState(!mobileDropdownState);
    };

    const myListsNavigate = (uid) => {
        navigate('/user/' + uid);
    };

    return (
        <div className={style.mainContainer}>
            <div className={style.container}>
                <button onClick={homepageNavigate} className={style.tempLogo}>
                    YSW
                </button>

                <div className={style.navRightContainer}>
                    <button
                        onClick={createListNavigate}
                        className={'btnBorderess'}
                    >
                        CREATE LIST
                    </button>
                    <Login setUser={props.setUser} />
                </div>
            </div>
            <div className={style.mobileContainer}>
                <button
                    onClick={mobileMenuBtnClick}
                    className={style.mobileMenuBtn}
                >
                    {mobileDropdownState ? <Close /> : <Hamburger />}
                </button>
                {mobileDropdownState && (
                    <div className={style.mobileDropdown}>
                        <Login
                            setUser={props.setUser}
                            createListOnClick={() => {
                                createListNavigate();
                                setMobileDropdownState(false);
                            }}
                            myListsOnClick={(uid) => {
                                myListsNavigate(uid);
                                setMobileDropdownState(false);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
