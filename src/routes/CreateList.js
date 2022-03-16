import React, { useState } from 'react';
import { setFirestoreList } from '../api/FirestoreList.js';
import { useNavigate } from 'react-router-dom';

import ItemSelect from '../components/listCreator/ItemSelect.js';
import { SearchMovies } from '../api/TmdbApi.js';

import style from './CreateList.module.css';

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

function redirectToList(docId, navigate) {
    navigate('/list/' + docId);
}

async function publishList(title, description, list, user, navigate) {
    const docId = await setFirestoreList(
        title,
        description,
        list,
        user,
        navigate
    );
    if (docId) {
        redirectToList(docId, navigate);
    }
}

export default function CreateList(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [list, setList] = useState([]);
    const [searchEles, setSearchEles] = useState([]);

    const navigate = useNavigate();

    return (
        <div className={style.container}>
            <input
                className={style.textInput}
                type="text"
                placeholder="Title"
                onInput={(e) => setTitle(e.target.value)}
            />
            <textarea
                className={`${style.textInput} ${style.description}`}
                type="text"
                placeholder="Description"
                onInput={(e) => setDescription(e.target.value)}
            />
            <input
                className={style.textInput}
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                    SearchMovies(e.target.value).then((res) => {
                        setSearchEles(res.data ? res.data.results : []);
                    });
                }}
            />
            <ItemSelect
                searchEles={searchEles}
                list={list}
                setList={setList}
                addMovie={addMovie}
                removeMovie={removeMovie}
                publish={() => {
                    publishList(title, description, list, props.user, navigate);
                }}
            />
        </div>
    );
}
