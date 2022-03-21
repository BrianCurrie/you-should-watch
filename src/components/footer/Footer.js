import style from './Footer.module.css';
import githubLogo from '../../imgs/icons/githubLight.png';

export default function Footer() {
    return (
        <div className={style.container}>
            <div className={style.copyright}>
                ©2022 Brian Currie
                <a
                    className={style.githubLink}
                    href="https://github.com/BrianCurrie/you-should-watch"
                    target="_blank"
                >
                    <img src={githubLogo} alt="Github" />
                </a>
            </div>
            <div className={style.iconAttribution}>
                Landing image created by aslaiart - Flaticon
            </div>
        </div>
    );
}
