
class SeriesGenre {
    constructor (genre) {
        this.genre = genre;
        this.seriesList = [];
    }
    get GetGenre () {
        return this.genre;
    }
    get GetSeriesList () {
        return this.seriesList;
    }
    set SetmSeriesList (SeriesList) {
        this.seriesList = seriesList;
    }

    SeriesListUpdater (movie) {
        this.seriesList.push(movie);
    }


}
module.exports = SeriesGenre;