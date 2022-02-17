export default function ListAddedItems(props) {
    return (
        <div>
            {props.list.map((movie) => (
                <div key={movie.id}>
                    {movie.title}
                    <button
                        onClick={() =>
                            props.removeMovie(movie, props.list, props.setList)
                        }
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
    );
}
