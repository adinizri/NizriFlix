
class MoviesGenre {
    constructor (genre) {
        this.genre = genre;
        this.List = [];//the movie list (general name to fit both movie and series)
    }
    get GetGenre () {
        return this.genre;
    }
    get GetList () {
        return this.List;
    }
    set SetList (List) {
        this.List = List;
    }

    ListUpdater (movie) {
        this.List.push(movie);
    }


}
module.exports = MoviesGenre;