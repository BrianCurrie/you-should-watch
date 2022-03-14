import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { TailSpin } from 'react-loader-spinner';

import { getFirestoreList } from '../api/FirestoreList.js';
import Info from '../components/list/Info.js';
import Posters from '../components/list/Posters.js';
import NotFound from '../components/notFound/NotFound.js';
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
                    <NotFound
                        mainText={'Uh oh...'}
                        subText={
                            "We couldn't find the list you were looking for"
                        }
                    />
                ) : (
                    <div className={style.container}>
                        <Info listData={listData} id={id} />
                        <Posters movies={listData.listArr} />
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
