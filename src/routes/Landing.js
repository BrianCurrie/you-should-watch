import { useNavigate } from 'react-router-dom';

import style from './Landing.module.css';
import koala from '../imgs/koala.png';
import arrow from '../imgs/icons/rightArrow.png';

export default function Landing() {
    let navigate = useNavigate();

    const createListNavigate = () => {
        navigate('/create');
    };

    return (
        <div className={style.mainContainer}>
            <div className={style.container}>
                <div className={style.leftContainer}>
                    <h1 className={style.mainText}>
                        Share your Favorite Movies
                    </h1>
                    <button
                        className={style.createBtn}
                        onClick={createListNavigate}
                    >
                        Create List{' '}
                        <img className={style.arrow} src={arrow} alt="Arrow" />
                    </button>
                </div>
                <img className={style.mainImage} src={koala} alt="Koala" />
            </div>
        </div>
    );
}
