import React, { useRef } from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    RedditShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    RedditIcon,
    LinkedinIcon,
    WhatsappIcon,
} from 'react-share';
import { ReactComponent as Close } from '../../imgs/icons/close.svg';

import style from './ShareMenu.module.css';

function copyToClipboard(url) {
    navigator.clipboard.writeText(url);
}

export default function ShareMenu(props) {
    const inputEle = useRef(null);
    const url = window.location.href;

    return (
        <div className={style.container}>
            <div className={style.header}>Share</div>
            <div className={style.iconContainer}>
                <RedditShareButton url={url}>
                    <RedditIcon size={32} round={true} />
                </RedditShareButton>
                <TwitterShareButton url={url}>
                    <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <FacebookShareButton url={url}>
                    <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <WhatsappShareButton url={url}>
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <LinkedinShareButton url={url}>
                    <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
            </div>

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
                <Close fill="var(--fillColor)" />
            </button>
        </div>
    );
}
