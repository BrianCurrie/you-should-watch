import { useNavigate } from 'react-router-dom';

import style from './Landing.module.css';
import koala from '../imgs/koala.png';
import { ReactComponent as Arrow } from '../imgs/icons/arrowRight.svg';

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
                        <span className={style.red}>Share</span> your Favorite{' '}
                        <span className={style.blue}>Movies</span>
                    </h1>
                    <button
                        className={style.createBtn}
                        onClick={createListNavigate}
                    >
                        CREATE LIST <Arrow fill="var(--fillColor)" />
                    </button>
                </div>
                <div className={style.heroContainer}>
                    <img className={style.mainImage} src={koala} alt="Koala" />
                    <div className={style.shapeContainer}>
                        <div className={style.circle} />
                        <div className={style.square} />
                    </div>
                </div>
            </div>
        </div>
    );
}
