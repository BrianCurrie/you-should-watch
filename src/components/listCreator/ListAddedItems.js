import style from './ListAddedItem.module.css';

export default function ListAddedItems(props) {
    return (
        <div className={style.container}>
            {props.list.map((movie) => (
                <div className={style.item} key={movie.id}>
                    <span>
                        {movie.title}
                        <span className={style.year}>
                            {movie.release_date.substring(0, 4)}
                        </span>
                    </span>
                    <button
                        className={style.removeBtn}
                        onClick={() =>
                            props.removeMovie(movie, props.list, props.setList)
                        }
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
    );
}
