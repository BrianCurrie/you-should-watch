import { ReactComponent as ChevronLeft } from '../../imgs/icons/chevronLeft.svg';
import { ReactComponent as ChevronRight } from '../../imgs/icons/chevronRight.svg';

import style from './PageNav.module.css';

export default function PageNav(props) {
    return (
        <div className={style.container}>
            <button className={style.chevron} onClick={props.leftOnClick}>
                <ChevronLeft fill="var(--fillColor)" />
            </button>
            <span className={style.pageTracker}>
                {props.page + 1}/{props.totalPages}
            </span>
            <button className={style.chevron} onClick={props.rightOnClick}>
                <ChevronRight fill="var(--fillColor)" />
            </button>
        </div>
    );
}
