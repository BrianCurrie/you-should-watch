import timeAgo from '../../utils/timeAgo';
import Share from './Share.js';

import style from './ListInfo.module.css';

export default function ListInfo(props) {
    const data = props.listData;
    return (
        <div className={style.container}>
            <div className={style.mainInfo}>
                <div className={style.title}>
                    {data.title ? data.title : 'Untitled'}
                </div>
                <div className={style.userDate}>
                    <div>{data.user ? data.user.name : 'Anonymous'}</div>
                    <div className={style.timeCreated}>
                        {timeAgo(data.timeCreated)}
                    </div>
                </div>
            </div>
            <div className={style.description}>{data.description}</div>

            <Share id={props.id} />
            <hr />
        </div>
    );
}
