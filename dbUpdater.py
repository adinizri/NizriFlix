from importlib.resources import path
import re
from string import digits
from sys import set_asyncgen_hooks
from tokenize import String
import pymongo
import os
from imdb import IMDb
from ImageDownloader import downloadFromGoogle
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
imdbDB = IMDb()
client = pymongo.MongoClient("localhost", 27017)  # mongo server address
db = client["nizriFlix"]  # db name
moviesDb = db["Movies"]  # db collection
seriesDb = db["Series"]  # db collection
episodesDb = db["Episodes"]  # db collection
moviesLocation = 'G:/Movies&Series/Movies'  # movies source
seriesLocation = 'G:/Movies&Series/Series'  # Series source
movieList = []  # movie list
seriesList = []  # series list
episodesList = []  # episodes list
seriesNamesList = os.listdir(seriesLocation)  # Gets all series names
defualtImage = "Empty_Img.png"  # deafualt image in case that we don't find any


def ExistImage(name, path):  # get the the wanted video poster photo
    image = ""
    list = os.listdir(path)
    if(name+".png" in list):
        image = list[list.index(name+".png")]
    elif(name+".jfif" in list):
        image = list[list.index(name+".jfif")]

    elif(name+".jpng" in list):
        image = list[list.index(name+".jpng")]

    elif(name+".jpg" in list):
        image = list[list.index(name+".jpg")]
    else:

        found = downloadFromGoogle(name, path)
        if found:
            image = name+".png"
        else:
            print("fail " + name)
            image = defualtImage

    return image


# gets the video genre (and episodes in case of a series)
def GetGenres(name, isMovie, dbData, getEpisodes):
    genre = "Not Listed"
    episodes = ""
    if dbData == None or getEpisodes:  # check if data not exist in db
        videoData = imdbDB.search_movie(name)
        videoId = -1
        if(videoData):  # if video id exist
            for video in videoData:
                if(isMovie):
                    if video.data['kind'] == 'movie' or video.data['kind'] == 'video movie':
                        videoId = video.movieID
                        break
                else:
                    if video.data['kind'] == 'tv series':
                        videoId = video.movieID
                        break

        if videoId != -1:
            episodes = ""
            videoData = imdbDB.get_movie(videoId)
            if('genres' in videoData.data):
                genre = videoData.data['genres']
                if(isMovie == False):
                    imdbDB.update(videoData, 'episodes')
                    episodes = videoData.data['episodes']

    else:  # if exist
        genre = dbData["genre"]
    if(isMovie):
        return genre
    else:
        return{"genre": genre, "episodes": episodes}


# Movies Part
for dirpath, dirnames, filenames in os.walk(moviesLocation):

    for name in filenames:
        image = "Empty_Img.png"
        dirpath = dirpath.replace("\\", "/")

        if '.mp4' in name:

            found = False
            newName = name.replace('.mp4', "")
            dbData = (moviesDb.find_one({"name": newName}))
            # check if img exist with the same name
            image = ExistImage(newName, dirpath)
            genre = GetGenres(newName, True, dbData, False)
            obj = {"name": newName, "location": dirpath,
                   "image": image, "genre": genre}
            if image != "":
                movieList.append(obj)
                print("Added "+newName)
            else:
                print("fail "+newName)


# Series Part
episodesDb.delete_many({})  # clear episodes collection
for seriesName in seriesNamesList:
    seriesPath = seriesLocation+"/"+seriesName
    seriesDbData = (seriesDb.find_one({"name": seriesName}))
    # image = ExistImage(seriesName, seriesPath)
    genreAndEpisodes = GetGenres(seriesName, False, seriesDbData, True)
    genre = genreAndEpisodes["genre"]
    episodes = genreAndEpisodes["episodes"]
    seasons = 0
    if(episodes != ""):
        seasons = len(episodes)
    seriesobj = {"name": seriesName, "location": seriesPath,
                 "image": image, "genre": genre, "seasons": seasons}
    if image != "":
        seriesList.append(seriesobj)
        print("Added "+seriesName)
    else:
        print("fail "+seriesName)

    # adding the episodes
    for dirpath, dirnames, filenames in os.walk(seriesPath):

        for name in filenames:
            if '.mp4' in name:
                season = -1
                episode = -1
                found = False
                newName = name.replace('.mp4', "")
                digits = re.findall(r'\d+', newName)
                season = digits[0]
                episode = digits[1]

                if(season != -1 and episode != -1):
                    if episode[0] == '0':
                        episode = episode[1]
                    if season[0] == '0':
                        season = season[1]
                    episodeDbData = (seriesDb.find_one(
                        {"seriesName": seriesName, "episode": episode, "season": season}))
                    if(episodes == "" and episodeDbData == None):
                        genreAndEpisodes = GetGenres(
                            seriesName, False, seriesDbData, False)
                        genre = genreAndEpisodes["genre"]
                        episodes = genreAndEpisodes["episodes"]
                    if(episodeDbData == None):
                        epiobj = {"seriesName": seriesName, "episodeName": (episodes[int(season)][int(episode)]).data['title'], "location": seriesPath,
                                  "episode": episode, "season": season}
                        episodesList.append(epiobj)
                        print("Added "+seriesName + " " + season + " "+episode)

moviesDb.delete_many({})  # clear movie collection
moviesDb.insert_many(movieList)  # add to movie collection
seriesDb.delete_many({})  # clear series collection
seriesDb.insert_many(seriesList)
episodesDb.insert_many(episodesList)  # add to episodes collection
