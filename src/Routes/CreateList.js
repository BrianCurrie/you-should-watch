import React, { useState } from 'react';
import { setFirestoreList } from '../Api/FirestoreList.js';

import ListAddedItems from '../Components/ListAddedItems.js';
import SearchItemList from '../Components/SearchItemList.js';
import { SearchMovies } from '../Api/TmdbApi.js';

import Login from '../Components/Login.js';

function addMovie(movie, list, setList) {
    // Check if movie is already in the list
    if (list.filter((ele) => ele.id === movie.id).length === 0) {
        setList((list) => [...list, movie]);
        console.log('Added: ', movie.title);
    } else {
        console.log('Duplicate');
    }
}

function removeMovie(movie, list, setList) {
    // Remove movie from list by filtering list and checking movie IDs
    const updatedList = list.filter((ele) => ele.id !== movie.id);
    setList(updatedList);
    console.log('Removed: ', movie.title);
}

async function publishList(title, description, list, user, setShareLink) {
    const docId = await setFirestoreList(title, description, list, user);
    if (docId) {
        setShareLink(window.location.href + docId);
    }
}

export default function CreateList(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [list, setList] = useState([]);
    const [searchEles, setSearchEles] = useState([]);
    const [shareLink, setShareLink] = useState('');

    return (
        <div>
            <Login setUser={props.setUser} />
            <input
                type="text"
                placeholder="Title"
                onInput={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                onInput={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                    SearchMovies(e.target.value).then((res) => {
                        setSearchEles(res.data ? res.data.results : []);
                    });
                }}
            />
            <button
                onClick={() => {
                    publishList(
                        title,
                        description,
                        list,
                        props.user,
                        setShareLink
                    );
                }}
            >
                Publish
            </button>
            <SearchItemList
                searchEles={searchEles}
                list={list}
                setList={setList}
                addMovie={addMovie}
            />
            <ListAddedItems
                list={list}
                setList={setList}
                removeMovie={removeMovie}
            />
            <a href={shareLink}>{shareLink}</a>
        </div>
    );
}
