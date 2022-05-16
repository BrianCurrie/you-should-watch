import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import { timeAgo } from '../../utils/formatTime.js';
import Share from './Share.js';
import { removeFromUsersLists, deleteList } from '../../api/FirestoreList.js';
import { ReactComponent as VertMenu } from '../../imgs/icons/vertMenu.svg';

import style from './Info.module.css';

export default function ListInfo(props) {
    const ref = useRef();
    const navigate = useNavigate();
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.listData.title);
    const [tempTitle, setTempTitle] = useState(props.listData.title);
    const [description, setDescription] = useState(props.listData.description);
    const [tempDescription, setTempDescription] = useState(
        props.listData.description
    );

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
        deleteList(props.id);
        removeFromUsersLists(props.listData.user, props.id).then(() =>
            navigate('/user/' + data.user.uid)
        );
    };

    const editOnClick = () => {
        setEditing(true);
        setOptionsOpen(false);
    };

    const saveOnClick = () => {
        setEditing(false);
        setTitle(tempTitle);
        setDescription(tempDescription);

        // Update Lists and Users collections data on save
    };

    const cancelOnClick = () => {
        setEditing(false);
        setTempTitle(title);
        setTempDescription(description);
    };

    const descriptionOnChange = (e) => {
        setTempDescription(e.target.value);
    };

    const titleOnChange = (e) => {
        setTempTitle(e.target.value);
    };

    // Check if the current user is the owner of a list
    // so we can conditionally render the options menu
    const isListOwner = () => {
        if (getAuth().currentUser && props.listData.user) {
            return getAuth().currentUser.uid === props.listData.user.uid;
        } else {
            return false;
        }
    };

    return (
        <div className={style.container}>
            {!editing && (
                <>
                    <div className={style.mainInfo}>
                        <div className={style.titleContainer}>
                            <div className={style.title}>
                                {title ? title : 'Untitled'}
                            </div>

                            {isListOwner() && (
                                <div className={style.menuContainer}>
                                    <button
                                        ref={ref}
                                        onClick={optionsOnClick}
                                        className={style.vertMenu}
                                    >
                                        <VertMenu fill="var(--fillColor)" />
                                    </button>
                                    {optionsOpen && (
                                        <div
                                            className={`dropdownMenu ${style.dropdownContainer}`}
                                        >
                                            <button onClick={editOnClick}>
                                                Edit Info
                                            </button>
                                            <hr />
                                            <button onClick={deleteOnClick}>
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className={style.userContainer}>
                            {data.user && (
                                <img
                                    className={style.userImg}
                                    onClick={() =>
                                        navigate('/user/' + data.user.uid)
                                    }
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
                                                navigate(
                                                    '/user/' + data.user.uid
                                                )
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

                    <div className={style.description}>{description}</div>

                    <Share id={props.id} />
                </>
            )}

            {editing && (
                <div className={style.editContainer}>
                    <input
                        className={style.titleInput}
                        type="text"
                        placeholder="Title"
                        spellCheck="true"
                        value={tempTitle}
                        onChange={titleOnChange}
                    />
                    <textarea
                        className={style.descriptionInput}
                        type="text"
                        placeholder="Description"
                        value={tempDescription}
                        onChange={descriptionOnChange}
                    />
                    <div className={style.editBtnContainer}>
                        <button className={`btn`} onClick={saveOnClick}>
                            Save
                        </button>
                        <button className={`btn`} onClick={cancelOnClick}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
