import { useNavigate } from 'react-router-dom';
import { timeAgo } from '../../utils/formatTime.js';
import Share from './Share.js';

import style from './Info.module.css';

export default function ListInfo(props) {
    const navigate = useNavigate();
    const data = props.listData;
    return (
        <div className={style.container}>
            <div className={style.mainInfo}>
                <div className={style.title}>
                    {data.title ? data.title : 'Untitled'}
                </div>
                <div className={style.userContainer}>
                    {data.user && (
                        <img
                            className={style.userImg}
                            onClick={() => navigate('/user/' + data.user.uid)}
                            alt="User"
                            src={data.user.profilePic}
                        />
                    )}
                    <div className={style.userDate}>
                        <div>
                            {data.user ? (
                                <button
                                    className={style.usernameBtn}
                                    onClick={() =>
                                        navigate('/user/' + data.user.uid)
                                    }
                                >
                                    {data.user.name}
                                </button>
                            ) : (
                                'Anonymous'
                            )}
                        </div>
                        <div className={style.timeCreated}>
                            {timeAgo(data.timeCreated)}
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.description}>{data.description}</div>

            <Share id={props.id} />
        </div>
    );
}
