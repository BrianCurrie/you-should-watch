import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getUsersData } from '../api/FirestoreList.js';
import ListPreview from '../components/user/ListPreview.js';
import { TailSpin } from 'react-loader-spinner';

import style from './User.module.css';

export default function User() {
    const { id } = useParams();

    const [data, setData] = useState({});
    const [lists, setLists] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        getUsersData(id).then((data) => {
            if (data) {
                setData(data);
                // Show lists that have full obj information
                setLists(data.lists.filter((list) => list.id));
                console.log(data.lists.filter((list) => list.id));
                setHasLoaded(true);
            }
        });
    }, [id]);

    return (
        <div className={style.mainContainer}>
            {hasLoaded ? (
                <div className={style.container}>
                    <div className={style.userContainer}>
                        <img
                            className={style.profilePic}
                            src={data.user.profilePic}
                            alt="Profile picture"
                        />
                        <h2 className={style.username}>{data.user.name}</h2>
                    </div>
                    <hr className={style.rowLine} />
                    <ListPreview masterList={lists} />
                </div>
            ) : (
                <div className={style.spinnerContainer}>
                    <TailSpin color="#8d8d8d" ariaLabel="loading-indicator" />
                </div>
            )}
        </div>
    );
}
