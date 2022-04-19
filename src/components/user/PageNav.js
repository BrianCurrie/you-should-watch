import leftChevron from '../../imgs/icons/leftChevron.png';
import rightChevron from '../../imgs/icons/rightChevron.png';

import style from './PageNav.module.css';

export default function PageNav(props) {
    return (
        <div className={style.container}>
            <button className={style.chevron} onClick={props.leftOnClick}>
                <img className={style.chevronImg} src={leftChevron} />
            </button>
            <span className={style.pageTracker}>
                {props.page + 1}/{props.totalPages}
            </span>
            <button className={style.chevron} onClick={props.rightOnClick}>
                <img className={style.chevronImg} src={rightChevron} />
            </button>
        </div>
    );
}
