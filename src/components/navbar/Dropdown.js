import { useNavigate } from 'react-router-dom';
import style from './Dropdown.module.css';

export default function Dropdown(props) {
    const navigate = useNavigate();

    const display = props.display
        ? style.dropdownActive
        : style.dropdownInactive;

    return (
        <div className={`${style.container} ${display}`}>
            <div className={style.signedIn}>Signed in as</div>
            <div>{props.user.displayName}</div>
            <hr className={style.line} />
            <button
                className={style.dropdownButton}
                onClick={() => {
                    navigate('/user/' + props.user.uid);
                    props.hideDropdown();
                }}
            >
                My Lists
            </button>
            <hr className={style.line} />
            <button className={style.dropdownButton} onClick={props.signOut}>
                Sign Out
            </button>
        </div>
    );
}
