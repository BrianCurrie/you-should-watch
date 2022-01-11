import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getFirestoreList } from '../FirebaseList.js';

export default function List() {
    const [list, setList] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        getFirestoreList(id).then((arr) => setList(arr));
    }, []);

    return (
        <div>
            <h1>Unique list ID: {id}</h1>
            {list.map((movie) => (
                <div key={movie.id}>{movie.title}</div>
            ))}
        </div>
    );
}
