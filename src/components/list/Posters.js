import React, { useState } from 'react';
import { GetMovieTrailer, GetMovieDetails } from '../../api/TmdbApi.js';
import Modal from './Modal.js';
import style from './Posters.module.css';

const posterDefaultPath = 'https://image.tmdb.org/t/p/w200/';
const backdropDefaultPath = 'https://image.tmdb.org/t/p/w780/';
const posterNotFoundPath = 'https://via.placeholder.com/200x300.jpg?text=';

export default function ListMovies(props) {
    const [trailerKey, setTrailerKey] = useState(undefined);
    const [selectedMovie, setSelectedMovie] = useState();
    const [selectedMovieId, setSelectMovieId] = useState();

    const closeModal = () => {
        setSelectedMovie(undefined);
        setSelectMovieId(undefined);
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
        setSelectMovieId(movie.id);
    };

    return (
        <div>
            {selectedMovie ? (
                <Modal
                    id={selectedMovieId}
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
                        <div
                            key={movie.id}
                            className={style.poster}
                            onClick={() => handleMovieClick(movie)}
                        >
                            <img
                                className={style.posterImg}
                                src={
                                    movie.poster_path
                                        ? posterDefaultPath + movie.poster_path
                                        : posterNotFoundPath + movie.title
                                }
                                alt={movie.title}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
