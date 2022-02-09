import SearchItem from './SearchItem.js';

export default function SearchitemList(props) {
    return (
        <div>
            {props.searchEles &&
                props.searchEles.map((movie) => (
                    <SearchItem
                        key={movie.id}
                        movie={movie}
                        addMovie={() =>
                            props.addMovie(movie, props.list, props.setList)
                        }
                    />
                ))}
        </div>
    );
}
