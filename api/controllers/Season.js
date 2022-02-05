
class Season {
    constructor (seriesName, seasonNumber) {
        this.seriesName = seriesName;//searies name
        this.seasonNumber = seasonNumber;// the episodes season
        this.episodes = []; //the season episodes list
    }
    get GetSeriesName () {
        return this.seriesName;
    }
    get GetSeasonNumber () {
        return this.seasonNumber;
    }
    get GetEpisodes () {
        return this.episodes;
    }
    set SetEpisodes (episodes) {
        this.episodes = episodes;
    }

    EpisodesUpdater (episode) {
        this.episodes.push(episode);
    }


}

module.exports = Season;