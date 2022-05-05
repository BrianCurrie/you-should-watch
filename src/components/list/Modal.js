import Youtube from 'react-youtube';
import { minutesToHourMinutes } from '../../utils/formatTime.js';
import { ReactComponent as Close } from '../../imgs/icons/close.svg';
import videoNotFoundImg from '../../imgs/videoNotFound.png';
import style from './Modal.module.css';

function formatGenres(genresArr) {
    // ex. genresArr: [{"id":28,"name":"Action"}, {"id":35,"name":"Comedy"}, ...]
    // Output: `Action, Comedy, ...`

    if (genresArr.length === 0) {
        return '';
    }

    let genreNames = genresArr.map((genre) => genre.name);
    let reducer = (namesString, currName) => namesString + ', ' + currName;

    return ' | ' + genreNames.reduce(reducer);
}

export default function Modal(props) {
    const selectedMovie = props.selectedMovie;
    const trailerKey = props.trailerKey;

    return (
        <div className={style.container}>
            <div onClick={props.closeModal} className={style.modalBackground} />
            <div
                className={`${style.modal} ${
                    props.backdrop ? style.headerSpacing : style.headerNoSpacing
                }`}
            >
                <button className={style.closeBtn} onClick={props.closeModal}>
                    <Close fill="var(--fillColor)" />
                </button>
                <div className={style.backdrop}>
                    {props.backdrop && (
                        <img
                            className={style.backdropImg}
                            src={props.backdrop}
                            alt={selectedMovie.title + ' backdrop'}
                        />
                    )}
                    <div className={style.backdropTransition} />
                </div>
                <div className={style.mainContent}>
                    <div>
                        <span className={style.title}>
                            {selectedMovie.title}
                        </span>{' '}
                        <span className={style.year}>
                            {selectedMovie.release_date.slice(0, 4)}
                        </span>
                    </div>
                    <div className={style.runtimeGenres}>
                        {minutesToHourMinutes(selectedMovie.runtime)}
                        {formatGenres(selectedMovie.genres)}
                    </div>
                    {trailerKey ? (
                        <div>
                            <div className={style.youtubeLarge}>
                                <Youtube
                                    videoId={trailerKey}
                                    opts={{
                                        height: '300',
                                        width: '450',
                                        playerVars: {
                                            enablejsapi: 1,
                                            origin: window.location.href,
                                        },
                                    }}
                                />
                            </div>
                            <div className={style.youtubeSmall}>
                                <Youtube
                                    videoId={trailerKey}
                                    opts={{
                                        height: '225',
                                        width: '300',
                                        playerVars: {
                                            enablejsapi: 1,
                                            origin: window.location.href,
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <img
                            className={style.videoNotFoundImg}
                            alt="Video not found"
                            src={videoNotFoundImg}
                        />
                    )}

                    <div className={style.overview}>
                        {selectedMovie.overview}
                    </div>

                    <div className={style.movieLinksContainer}>
                        {selectedMovie.imdb_id && (
                            <a
                                className={style.movieLinks}
                                href={`https://www.imdb.com/title/${selectedMovie.imdb_id}`}
                            >
                                IMDB
                            </a>
                        )}
                        {props.id && (
                            <a
                                className={style.movieLinks}
                                href={`https://www.themoviedb.org/movie/${props.id}`}
                            >
                                TMDB
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
