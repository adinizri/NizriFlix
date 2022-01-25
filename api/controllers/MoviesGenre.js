
class MoviesGenre {
    constructor (genre) {
        this.genre = genre;
        this.moviesList = [];
    }
    get GetGenre () {
        return this.genre;
    }
    get GetmoviesList () {
        return this.moviesList;
    }
    set SetmoviesList (moviesList) {
        this.moviesList = moviesList;
    }

    MoviesListUpdater (movie) {
        this.moviesList.push(movie);
    }


}
module.exports = MoviesGenre;