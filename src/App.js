import React, { useState } from 'react';
import Axios from 'axios';

import SearchItem from './SearchItem.js';
import { setFirestoreList } from './FirebaseList.js';

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
    const [searchEles, setSearchEles] = useState([]);
    const [shareLink, setShareLink] = useState('');

    function addMovie(movie) {
        // Check if movie is already in the list
        if (list.filter((ele) => ele.id === movie.id).length === 0) {
            setList((list) => [...list, movie]);
            console.log('Added: ', movie.title);
        } else {
            console.log('Duplicate');
        }
    }

    async function createList() {
        const docId = await setFirestoreList(list);
        if (docId) {
            setShareLink(window.location.href + docId);
        }
    }

    return (
        <div>
            <input
                onChange={(e) => {
                    searchMovies(e.target.value).then((res) => {
                        setSearchEles(res.data ? res.data.results : []);
                    });
                }}
            />
            <button onClick={createList}>Create List</button>
            <a href={shareLink}>{shareLink}</a>
            {searchEles &&
                searchEles.map((movie) => (
                    <SearchItem
                        key={movie.id}
                        movie={movie}
                        addMovie={addMovie}
                    />
                ))}
        </div>
    );
}

export default App;
