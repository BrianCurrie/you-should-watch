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

function filterSearch(searchEles, sortBy) {
    // Filter movies without a release date
    let arr = [...searchEles].filter((movie) => movie.release_date);
    switch (sortBy) {
        case 'newest':
            return arr.sort(
                (a, b) => new Date(b.release_date) - new Date(a.release_date)
            );
        case 'oldest':
            return arr.sort(
                (a, b) => new Date(a.release_date) - new Date(b.release_date)
            );
        default:
            return arr.sort((a, b) => b.popularity - a.popularity);
    }
}

export default function CreateList(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [list, setList] = useState([]);
    const [searchEles, setSearchEles] = useState([]);
    const [sortBy, setSortBy] = useState('popular');

    const navigate = useNavigate();

    return (
        <div className={style.container}>
            <input
                className={style.textInput}
                type="text"
                placeholder="Title"
                spellCheck="true"
                onInput={(e) => setTitle(e.target.value)}
            />
            <textarea
                className={`${style.textInput} ${style.description}`}
                type="text"
                placeholder="Description"
                onInput={(e) => setDescription(e.target.value)}
            />
            <div className={style.searchContainer}>
                <input
                    className={`${style.textInput} ${style.search}`}
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => {
                        SearchMovies(e.target.value).then((res) => {
                            setSearchEles(
                                res.data
                                    ? filterSearch(res.data.results, sortBy)
                                    : []
                            );
                        });
                    }}
                />
                <select
                    className={style.sortBySelect}
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        setSearchEles(filterSearch(searchEles, e.target.value));
                    }}
                >
                    <option value="popular">Popular</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>
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
