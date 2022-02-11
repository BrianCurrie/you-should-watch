import Login from './Login.js';

import style from './Navbar.module.css';

export default function Navbar(props) {
    return (
        <div className={style.container}>
            <div className={style.tempLogo}>YSW</div>
            <Login setUser={props.setUser} />
        </div>
    );
}
