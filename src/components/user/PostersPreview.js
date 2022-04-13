import style from './PostersPreview.module.css';

const posterDefaultPath = 'https://image.tmdb.org/t/p/w200/';
const posterNotFoundPath = 'https://via.placeholder.com/200x300.jpg?text=';

export default function PostersPreview(props) {
    let posters = props.posterPaths.map((path) =>
        path ? posterDefaultPath + path : posterNotFoundPath
    );

    // Max 3 posters
    posters = posters.slice(0, 3);

    return (
        <div className={style.container}>
            {posters.map((poster) => (
                <div className={style.posterContainer} key={poster}>
                    <img className={style.poster} src={poster} />
                </div>
            ))}
        </div>
    );
}
