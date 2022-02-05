
class Series {
    constructor (seriesName, genre) {
        this.genre = genre;//series genre   
        this.seriesName = seriesName;
        this.seasons = [];// the seasons list (contains the episodes of each season)
        this.image = "";
    }
    get GetSeriesName () {
        return this.seriesName;
    }

    get GetSeasons () {
        return this.seasons;
    }
    set Setseasons (seasons) {
        this.seasons = seasons;
    }
    SetImage (image) {
        this.image = image;
    }
    SeasonsUpdater (season) {
        this.seasons.push(season);
    }


}

module.exports = Series;