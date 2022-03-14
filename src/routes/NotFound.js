import style from './NotFound.module.css';

export default function NotFound() {
    return (
        <div className={style.container}>
            <div className={style.mainText}>That's not good...</div>
            <div className={style.subText}>
                There doesn't seem to be anything here
            </div>
        </div>
    );
}
