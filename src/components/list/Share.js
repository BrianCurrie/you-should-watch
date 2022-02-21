import React, { useState } from 'react';
import ShareMenu from './ShareMenu.js';

import style from './Share.module.css';

export default function Share(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleView = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={style.container}>
            {isOpen ? (
                <ShareMenu toggleView={toggleView} id={props.id} />
            ) : (
                <button
                    onClick={() => {
                        toggleView();
                    }}
                    className={'btn'}
                >
                    Share
                </button>
            )}
        </div>
    );
}
