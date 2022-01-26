import Axios from 'axios';

export default async function SearchMovies(query) {
    const tmdbApiKey = '25fdf9176de21bcf1b06588eca8336a6';

    return query
        ? Axios.get(
              `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&language=en-US&query=${query}&page=1`
          )
        : [];
}
