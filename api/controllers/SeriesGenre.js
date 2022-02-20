
class SeriesGenre {
    constructor (genre) {
        this.genre = genre;
        this.List = [];//the seires list (general name to fit both movie and series)
    }
    get GetGenre () {
        return this.genre;
    }
    get GetList () {
        return this.List;
    }
    set SetmList (List) {
        this.List = List;
    }

    ListUpdater (series) {
        this.List.push(series);
    }


}

module.exports = SeriesGenre;