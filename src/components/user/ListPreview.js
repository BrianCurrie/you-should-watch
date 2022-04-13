import { useNavigate } from 'react-router-dom';
import PostersPreview from './PostersPreview.js';
import { timeAgo } from '../../utils/formatTime.js';
import style from './ListPreview.module.css';

export default function ListPreview(props) {
    const navigate = useNavigate();
    return (
        <div>
            {props.masterList
                .map((list) => (
                    <div
                        className={style.listContainer}
                        key={list.id}
                        onClick={() => navigate('/list/' + list.id)}
                    >
                        <PostersPreview
                            posterPaths={list.listArr.map(
                                (list) => list.poster_path
                            )}
                        />
                        <div className={style.listInfo}>
                            <div className={style.mainInfoContainer}>
                                <span className={style.title}>
                                    {list.title ? list.title : 'Untitled'}
                                </span>
                                <span className={style.timeAgo}>
                                    {timeAgo(list.timeCreated)}
                                </span>
                            </div>
                            <div className={style.description}>
                                {list.description}
                            </div>
                        </div>
                    </div>
                ))
                .reverse()}
        </div>
    );
}
