import Axios from 'axios';

const tmdbApiKey = '25fdf9176de21bcf1b06588eca8336a6';

async function SearchMovies(query) {
    return query
        ? Axios.get(
              `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&language=en-US&query=${query}&page=1`
          )
        : [];
}

function findBestVideoMatch(videos) {
    const ytVideos = videos.filter((video) => video.site === 'YouTube');
    const trailers = ytVideos.filter((video) => video.type === 'Trailer');
    const officialTrailers = trailers.filter((trailer) => trailer.official);

    // Return first truthy video object, preference being given from left to right
    return [officialTrailers[0], trailers[0], ytVideos[0]].find((v) => v);
}

async function GetMovieTrailer(id) {
    let request = await Axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${tmdbApiKey}`
    );

    let videos = request.data.results;

    return findBestVideoMatch(videos);
}

async function GetMovieDetails(id) {
    let request = await Axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}`
    );

    return request.data;
}

export { SearchMovies, GetMovieTrailer, GetMovieDetails };
