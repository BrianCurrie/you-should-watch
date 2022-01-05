import React, { useState } from 'react';
import Axios from 'axios';

import SearchItem from './SearchItem.js';

const tmdbApiKey = '25fdf9176de21bcf1b06588eca8336a6';

async function searchMovies(query) {
    return query
        ? Axios.get(
              `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&language=en-US&query=${query}&page=1`
          )
        : [];
}

function App() {
    const [list, setList] = useState([]);
    const [movies, setMovies] = useState([]);

    return (
        <div>
            <input
                onChange={(e) => {
                    searchMovies(e.target.value).then((res) => {
                        setMovies(res.data ? res.data.results : []);
                        console.log(res.data.results);
                    });
                }}
            />
            {movies &&
                movies.map((movie) => (
                    <SearchItem key={movie.id} movie={movie} />
                ))}
        </div>
    );
}

export default App;
