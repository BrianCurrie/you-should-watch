import style from './NotFound.module.css';

export default function NotFound(props) {
    return (
        <div className={style.container}>
            <div className={style.mainText}>{props.mainText}</div>
            <div className={style.subText}>{props.subText}</div>
        </div>
    );
}
