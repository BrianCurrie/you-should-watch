import React, { useState } from 'react';
import { GetMovieTrailer, GetMovieDetails } from '../../api/TmdbApi.js';
import Modal from './Modal.js';
import style from './ListPosters.module.css';

const posterDefaultPath = 'https://image.tmdb.org/t/p/w200/';
const backdropDefaultPath = 'https://image.tmdb.org/t/p/w780/';

export default function ListMovies(props) {
    const [trailerKey, setTrailerKey] = useState(undefined);
    const [selectedMovie, setSelectedMovie] = useState();

    const closeModal = () => {
        setSelectedMovie(undefined);
    };

    const handleMovieClick = (movie) => {
        GetMovieTrailer(movie.id).then((res) => {
            if (res) {
                console.log(movie);
                setTrailerKey(res.key);
            } else {
                setTrailerKey(undefined);
                console.log('No video found');
            }
        });

        GetMovieDetails(movie.id).then((res) => setSelectedMovie(res));
    };

    return (
        <div>
            {selectedMovie ? (
                <Modal
                    selectedMovie={selectedMovie}
                    trailerKey={trailerKey}
                    closeModal={closeModal}
                    backdrop={
                        selectedMovie.backdrop_path
                            ? backdropDefaultPath + selectedMovie.backdrop_path
                            : undefined
                    }
                />
            ) : undefined}
            {props.movies ? (
                <div className={style.container}>
                    {props.movies.map((movie) => (
                        <img
                            className={style.poster}
                            key={movie.id}
                            src={posterDefaultPath + movie.poster_path}
                            alt={movie.title}
                            onClick={() => handleMovieClick(movie)}
                        />
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
