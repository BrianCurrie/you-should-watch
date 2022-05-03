import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import PostersPreview from './PostersPreview.js';
import PageNav from './PageNav.js';
import { timeAgo } from '../../utils/formatTime.js';

import style from './ListPreview.module.css';

export default function ListPreview(props) {
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    // How many lists to display per page
    const listsPerPage = 4;
    const totalPages =
        props.masterList.length != 0
            ? Math.ceil(props.masterList.length / listsPerPage)
            : 1;

    const leftOnClick = () => {
        if (page - 1 >= 0) {
            setPage(page - 1);
        }
    };

    const rightOnClick = () => {
        if (page + 1 < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div>
            <PageNav
                leftOnClick={leftOnClick}
                rightOnClick={rightOnClick}
                page={page}
                totalPages={totalPages}
            />
            {props.masterList.length > 0 ? (
                props.masterList
                    .map((list) => (
                        <div
                            className={style.listContainer}
                            key={list.id}
                            onClick={() => navigate('/list/' + list.id)}
                        >
                            <PostersPreview
                                posterPaths={list.listArr.map(
                                    (list) => list.poster_path
                                )}
                            />
                            <div className={style.listInfo}>
                                <div className={style.mainInfoContainer}>
                                    <span className={style.title}>
                                        {list.title ? list.title : 'Untitled'}
                                    </span>
                                    <span className={style.timeAgo}>
                                        {timeAgo(list.timeCreated)}
                                    </span>
                                </div>
                                <div className={style.description}>
                                    {list.description}
                                </div>
                            </div>
                        </div>
                    ))
                    .slice(
                        page * listsPerPage,
                        page * listsPerPage + listsPerPage
                    )
            ) : (
                <div className={style.notFoundContainer}>
                    <div>No lists found</div>
                </div>
            )}
        </div>
    );
}
