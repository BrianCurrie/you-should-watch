import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getFirestoreList } from '../Api/FirestoreList.js';

import Login from '../Components/Login.js';
import ListInfo from '../Components/ListInfo.js';
import ListMovies from '../Components/ListMovies.js';

export default function List(props) {
    const [listData, setListData] = useState({});
    const { id } = useParams();

    // Hook similar to componentDidMount
    // Only calls getFireStoreList() once, on initial mount
    useEffect(() => {
        getFirestoreList(id).then((data) => setListData(data));
    }, []);

    return (
        <div>
            <Login setUser={props.setUser} />
            <ListInfo listData={listData} id={id} />
            <ListMovies movies={listData.listArr} />
        </div>
    );
}
