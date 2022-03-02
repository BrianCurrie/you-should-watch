import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getFirestoreList } from '../api/FirestoreList.js';

import ListInfo from '../components/list/ListInfo.js';
import ListMovies from '../components/list/ListPosters.js';

import style from './List.module.css';

export default function List() {
    const [listData, setListData] = useState({});
    const { id } = useParams();

    // Hook similar to componentDidMount
    // Only calls getFireStoreList() once, on initial mount
    useEffect(() => {
        getFirestoreList(id).then((data) => setListData(data));
    }, []);

    return (
        <div className={style.mainContainer}>
            <div className={style.container}>
                <ListInfo listData={listData} id={id} />
                <ListMovies movies={listData.listArr} />
            </div>
        </div>
    );
}
