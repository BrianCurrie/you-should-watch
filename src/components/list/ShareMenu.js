import React, { useState, useRef } from 'react';

import style from './ShareMenu.module.css';

function copyToClipboard(url) {
    navigator.clipboard.writeText(url);
}

export default function ShareMenu(props) {
    const inputEle = useRef(null);

    const url = window.location.origin + '/' + props.id;
    return (
        <div className={style.container}>
            <div>Share</div>

            <input
                ref={inputEle}
                className={style.urlInput}
                type="text"
                readOnly
                onClick={() => {
                    inputEle.current.select();
                }}
                value={url}
            />
            <button
                className={`btn`}
                onClick={() => {
                    copyToClipboard(url);
                    inputEle.current.focus();
                    inputEle.current.select();
                }}
            >
                Copy
            </button>

            <button
                className={style.closeBtn}
                onClick={() => {
                    props.toggleView();
                }}
            >
                X
            </button>
        </div>
    );
}
