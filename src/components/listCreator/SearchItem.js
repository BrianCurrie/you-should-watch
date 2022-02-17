import style from './SearchItem.module.css';

export default function SearchItem(props) {
    const movie = props.movie;
    // Release_date format yyyy-mm-dd
    const date = new Date(props.movie.release_date);
    // Placeholder poster
    const placeholderUrl = `http://via.placeholder.com/100x150.jpg?text=No+Image`;
    // Url path image.tmdb.org/t/p/{width}/{filename}
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
        : placeholderUrl;

    return (
        <div className={style.container}>
            <img className={style.poster} src={posterUrl} alt={movie.title} />
            <div className={style.info}>
                <div className={style.mainInfo}>
                    <div>{movie.title}</div>
                    <div className={style.year}>
                        {date.getFullYear() ? date.getFullYear() : null}
                    </div>
                </div>
                <div className={style.overview}>{movie.overview}</div>
            </div>
            <button className={style.addMovieBtn} onClick={props.addMovie}>
                +
            </button>
        </div>
    );
}
