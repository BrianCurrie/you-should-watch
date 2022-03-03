import style from './ListNotFound.module.css';

export default function ListNotFount() {
    return (
        <div className={style.container}>
            <div className={style.mainText}>Uh oh...</div>
            <div className={style.subText}>
                We couldn't find the list you were looking for
            </div>
        </div>
    );
}
