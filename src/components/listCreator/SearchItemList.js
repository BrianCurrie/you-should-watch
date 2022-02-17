import SearchItem from './SearchItem.js';

import style from './SearchItemList.module.css';

export default function SearchitemList(props) {
    return (
        <div className={style.container}>
            {props.searchEles.length > 0 ? (
                props.searchEles.map((movie) => (
                    <SearchItem
                        key={movie.id}
                        movie={movie}
                        addMovie={() =>
                            props.addMovie(movie, props.list, props.setList)
                        }
                    />
                ))
            ) : (
                <div className={style.placeholder}>
                    <div>No movies found</div>
                </div>
            )}
        </div>
    );
}
