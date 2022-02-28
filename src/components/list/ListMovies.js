import React, { useState } from 'react';
import { GetMovieTrailer, GetMovieDetails } from '../../api/TmdbApi.js';
import Modal from './Modal.js';

const posterDefaultPath = 'https://image.tmdb.org/t/p/w200/';
const backdropDefaultPath = 'https://image.tmdb.org/t/p/w780/';

export default function ListMovies(props) {
    const [trailerKey, setTrailerKey] = useState();
    const [selectedMovie, setSelectedMovie] = useState();

    const closeModal = () => {
        setSelectedMovie(undefined);
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
