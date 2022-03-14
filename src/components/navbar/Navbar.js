import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login.js';

import style from './Navbar.module.css';
import hamburger from '../../imgs/icons/hamburger.png';
import close from '../../imgs/icons/close.png';

export default function Navbar(props) {
    let navigate = useNavigate();

    const [mobileDropdownState, setMobileDropdownState] = useState(false);

    const createListNavigate = () => {
        navigate('/');
    };

    const mobileMenuBtnClick = () => {
        setMobileDropdownState(!mobileDropdownState);
    };

    return (
        <div className={style.mainContainer}>
            <div className={style.container}>
                <div className={style.tempLogo}>YSW</div>
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
                    {mobileDropdownState ? (
                        <img
                            className={style.closeIcon}
                            alt="close nav"
                            src={close}
                        />
                    ) : (
                        <img
                            className={style.hamburgerIcon}
                            alt="open nav"
                            src={hamburger}
                        />
                    )}
                </button>
                {mobileDropdownState && (
                    <div className={style.mobileDropdown}>
                        <Login
                            setUser={props.setUser}
                            createListOnClick={() => {
                                createListNavigate();
                                setMobileDropdownState(false);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
