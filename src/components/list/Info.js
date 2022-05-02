import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import { timeAgo } from '../../utils/formatTime.js';
import Share from './Share.js';
import { removeFromUsersLists } from '../../api/FirestoreList.js';
import { ReactComponent as VertMenu } from '../../imgs/icons/vertMenu.svg';

import style from './Info.module.css';

export default function ListInfo(props) {
    const ref = useRef();
    const navigate = useNavigate();
    const [optionsOpen, setOptionsOpen] = useState(false);

    // Close dropdown on outside click
    useEffect(() => {
        const isOutsideClick = (e) => {
            // Check if dropdown is currently displayed, and if the click event
            // is not within the menu
            if (optionsOpen && ref.current && !ref.current.contains(e.target)) {
                setOptionsOpen(false);
            }
        };

        document.addEventListener('click', isOutsideClick);

        // Event listener cleanup
        return () => {
            document.removeEventListener('click', isOutsideClick);
        };
    }, [optionsOpen]);

    const data = props.listData;

    const toggleOptionsMenu = () => {
        setOptionsOpen(!optionsOpen);
    };

    const optionsOnClick = () => {
        toggleOptionsMenu();
    };

    const deleteOnClick = () => {
        removeFromUsersLists(props.listData.user, props.id).then(() =>
            navigate('/user/' + data.user.uid)
        );
    };

    // Check if the current user is the owner of a list
    // so we can conditionally render the delete option
    const isListOwner = () => {
        if (getAuth().currentUser && props.listData.user) {
            return getAuth().currentUser.uid === props.listData.user.uid;
        } else {
            return false;
        }
    };

    return (
        <div className={style.container}>
            <div className={style.mainInfo}>
                <div className={style.titleContainer}>
                    <div className={style.title}>
                        {data.title ? data.title : 'Untitled'}
                    </div>
                    {isListOwner() && (
                        <button
                            ref={ref}
                            onClick={optionsOnClick}
                            className={style.vertMenu}
                        >
                            <VertMenu fill="var(--fillColor)" />
                        </button>
                    )}
                    {optionsOpen && (
                        <button
                            onClick={deleteOnClick}
                            className={`dropdownMenu ${style.deleteBtn}`}
                        >
                            Delete List
                        </button>
                    )}
                </div>

                <div className={style.userContainer}>
                    {data.user && (
                        <img
                            className={style.userImg}
                            onClick={() => navigate('/user/' + data.user.uid)}
                            alt="User"
                            src={data.user.profilePic}
                        />
                    )}
                    <div className={style.userDate}>
                        <div>
                            {data.user ? (
                                <button
                                    className={style.usernameBtn}
                                    onClick={() =>
                                        navigate('/user/' + data.user.uid)
                                    }
                                >
                                    {data.user.name}
                                </button>
                            ) : (
                                'Anonymous'
                            )}
                        </div>
                        <div className={style.timeCreated}>
                            {timeAgo(data.timeCreated)}
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.description}>{data.description}</div>

            <Share id={props.id} />
        </div>
    );
}
