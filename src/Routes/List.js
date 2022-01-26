import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getFirestoreList } from '../Api/FirestoreList.js';

export default function List() {
    const [listData, setListData] = useState({});
    const { id } = useParams();
    useEffect(() => {
        getFirestoreList(id).then((data) => setListData(data));
    }, []);

    return (
        <div>
            <h1>{listData.title}</h1>
            <h2>{listData.description}</h2>
            <h3>Unique list ID: {id}</h3>
            {listData.listArr ? (
                listData.listArr.map((movie) => (
                    <div key={movie.id}>{movie.title}</div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
