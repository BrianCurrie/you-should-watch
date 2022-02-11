import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getFirestoreList } from '../api/FirestoreList.js';

import ListInfo from '../components/ListInfo.js';
import ListMovies from '../components/ListMovies.js';

export default function List() {
    const [listData, setListData] = useState({});
    const { id } = useParams();

    // Hook similar to componentDidMount
    // Only calls getFireStoreList() once, on initial mount
    useEffect(() => {
        getFirestoreList(id).then((data) => setListData(data));
    }, []);

    return (
        <div>
            <ListInfo listData={listData} id={id} />
            <ListMovies movies={listData.listArr} />
        </div>
    );
}
