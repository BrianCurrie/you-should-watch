import style from './Dropdown.module.css';

export default function Dropdown(props) {
    const display = props.display
        ? style.dropdownActive
        : style.dropdownInactive;
    return (
        <div className={`${style.container} ${display}`}>
            <div className={style.signedIn}>Signed in as</div>
            <div>{props.user.displayName}</div>
            <hr className={style.line} />
            <button className={style.signOutButton} onClick={props.signOut}>
                Sign out
            </button>
        </div>
    );
}
