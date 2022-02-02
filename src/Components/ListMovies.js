const posterDefaultPath = 'https://image.tmdb.org/t/p/w200/';

export default function ListMovies(props) {
    return (
        <div>
            {props.movies ? (
                props.movies.map((movie) => (
                    <img
                        key={movie.id}
                        src={posterDefaultPath + movie.poster_path}
                        alt={movie.title}
                    />
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
