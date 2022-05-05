import { ReactComponent as Close } from '../../imgs/icons/close.svg';
import style from './ListAddedItem.module.css';

export default function ListAddedItems(props) {
    return (
        <div className={style.container}>
            {props.list.length > 0 ? (
                props.list.map((movie) => (
                    <div className={style.item} key={movie.id}>
                        <span>
                            {movie.title}
                            <span className={style.year}>
                                {movie.release_date &&
                                    movie.release_date.substring(0, 4)}
                            </span>
                        </span>
                        <button
                            className={style.removeBtn}
                            onClick={() =>
                                props.removeMovie(
                                    movie,
                                    props.list,
                                    props.setList
                                )
                            }
                        >
                            <Close fill="var(--fillColor)" />
                        </button>
                    </div>
                ))
            ) : (
                <div className={style.placeholder}>
                    <div>No movies added</div>
                </div>
            )}
        </div>
    );
}
