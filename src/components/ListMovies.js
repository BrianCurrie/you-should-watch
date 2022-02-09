import React, { useState } from 'react';
import Youtube from 'react-youtube';

import { GetMovieTrailer, GetMovieDetails } from '../api/TmdbApi.js';

const posterDefaultPath = 'https://image.tmdb.org/t/p/w200/';

function minutesToHourMinutes(time) {
    // ex. Input: 145 -> Output: `2h 25m`
    const hours = Math.floor(time / 60);
    const mintues = time % 60;

    return `${hours}h ${mintues}m`;
}

function formatGenres(genresArr) {
    // genresArr structure: [{"id":28,"name":"Action"}, {"id":35,"name":"Comedy"}, ...]
    // Output: `Action, Comedy, ...`
    let genreNames = genresArr.map((genre) => genre.name);
    let reducer = (namesString, currName) => namesString + ', ' + currName;

    return genreNames.reduce(reducer);
}

export default function ListMovies(props) {
    const [trailerKey, setTrailerKey] = useState();
    const [selectedMovie, setSelectedMovie] = useState();

    return (
        <div>
            {selectedMovie ? (
                <div>
                    <div>
                        {selectedMovie.title}{' '}
                        {selectedMovie.release_date.slice(0, 4)}
                    </div>
                    <div>
                        {minutesToHourMinutes(selectedMovie.runtime)} |{' '}
                        {formatGenres(selectedMovie.genres)}
                    </div>
                    {trailerKey ? <Youtube videoId={trailerKey} /> : undefined}
                    <div>{selectedMovie.overview}</div>
                </div>
            ) : undefined}
            <hr />
            {props.movies ? (
                props.movies.map((movie) => (
                    <img
                        key={movie.id}
                        src={posterDefaultPath + movie.poster_path}
                        alt={movie.title}
                        onClick={() => {
                            GetMovieTrailer(movie.id).then((res) => {
                                if (res) {
                                    console.log(movie);
                                    setTrailerKey(res.key);
                                } else {
                                    console.log('No video found');
                                }
                            });

                            GetMovieDetails(movie.id).then((res) =>
                                setSelectedMovie(res)
                            );
                        }}
                    />
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
