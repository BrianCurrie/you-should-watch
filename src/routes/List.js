import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { TailSpin } from 'react-loader-spinner';

import { getFirestoreList } from '../api/FirestoreList.js';
import ListInfo from '../components/list/ListInfo.js';
import ListPosters from '../components/list/ListPosters.js';
import ListNotFount from '../components/list/ListNotFount.js';
import style from './List.module.css';

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export default function List() {
    const [listData, setListData] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const { id } = useParams();

    // Hook similar to componentDidMount
    // Only calls getFireStoreList() once, on initial mount
    useEffect(() => {
        getFirestoreList(id).then((data) => {
            setListData(data);
            setHasLoaded(true);
        });
    }, [id]);

    return (
        <div className={style.mainContainer}>
            {hasLoaded ? (
                isEmpty(listData) ? (
                    <ListNotFount />
                ) : (
                    <div className={style.container}>
                        <ListInfo listData={listData} id={id} />
                        <ListPosters movies={listData.listArr} />
                    </div>
                )
            ) : (
                <div className={style.spinnerContainer}>
                    <TailSpin color="#8d8d8d" ariaLabel="loading-indicator" />
                </div>
            )}
        </div>
    );
}
