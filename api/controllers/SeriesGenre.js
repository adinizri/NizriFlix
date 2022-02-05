
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

    SeriesListUpdater (series) {
        this.seriesList.push(series);
    }


}

module.exports = SeriesGenre;