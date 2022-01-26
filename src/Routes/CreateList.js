import React, { useState } from 'react';
import { setFirestoreList } from '../FirebaseList.js';

import SearchItem from '../Components/SearchItem.js';
import SearchMovies from '../Components/SearchMovies.js';

export default function CreateList() {
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

    function removeMovie(movie) {
        const updatedList = list.filter((ele) => ele.id !== movie.id);
        setList(updatedList);
        console.log('Removed: ', movie.title);
    }

    async function createList() {
        const docId = await setFirestoreList(list);
        if (docId) {
            setShareLink(window.location.href + docId);
        }
    }

    return (
        <div>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Description" />
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                    SearchMovies(e.target.value).then((res) => {
                        setSearchEles(res.data ? res.data.results : []);
                    });
                }}
            />
            <button onClick={createList}>Publish</button>
            {searchEles &&
                searchEles.map((movie) => (
                    <SearchItem
                        key={movie.id}
                        movie={movie}
                        addMovie={addMovie}
                    />
                ))}
            {list.map((movie) => (
                <div key={movie.id}>
                    {movie.title}
                    <button onClick={() => removeMovie(movie)}>X</button>
                </div>
            ))}
            <a href={shareLink}>{shareLink}</a>
        </div>
    );
}
