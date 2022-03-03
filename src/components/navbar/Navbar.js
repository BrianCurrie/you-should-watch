import Login from './Login.js';

import style from './Navbar.module.css';

export default function Navbar(props) {
    return (
        <div className={style.container}>
            <div className={style.tempLogo}>YSW</div>
            <div className={style.navRightContainer}>
                <button className={'btnBorderess'}>CREATE LIST</button>
                <Login setUser={props.setUser} />
            </div>
        </div>
    );
}
