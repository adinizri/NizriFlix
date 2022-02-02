from importlib.resources import path
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
episodesDb = db["Series"]  # db collection
moviesLocation = 'G:/Movies&Series/Movies'  # movies source
seriesLocation = 'G:/Movies&Series/Series'  # Series source
movieList = []
seriesList = []
seriesNamesList = os.listdir(seriesLocation)
defualtImage = "Empty_Img.png"

# get the the wanted video poster photo


def ExistImage(name, path, list):
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


# gets the video genre
def GetGenres(name, isMovie, dbData):
    genre = "Not Listed"
    if dbData == None:  # check if data not exist in db
        videoData = imdbDB.search_movie(name)
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

        else:
            videoId = -1

        if videoId != -1:
            videoData = imdbDB.get_movie(videoId)
            if('genres' in videoData.data):
                genre = videoData.data['genres']

    else:  # if exist
        genre = dbData["genre"]
    return genre


# Movies Part
for dirpath, dirnames, filenames in os.walk(moviesLocation):

    names = filenames

    for name in names:
        image = "Empty_Img.png"
        dirpath = dirpath.replace("\\", "/")

        if '.mp4' in name:

            found = False
            newName = name.replace('.mp4', "")
            dbData = (moviesDb.find_one({"name": newName}))
            # check if img exist with the same name
            image = ExistImage(newName, dirpath)
            genre = GetGenres(newName, True, dbData)
            obj = {"name": newName, "location": dirpath,
                   "image": image, "genre": genre}
            if image != "":
                movieList.append(obj)
                print("Added "+newName)
            else:
                print("fail "+newName)


# Series Part
for seriesName in seriesNamesList:
    seriesPath = seriesLocation+"/"+seriesName
    dbData = (seriesDb.find_one({"name": seriesName}))

    image = ExistImage(seriesName, seriesPath)
    genre = GetGenres(seriesName, False, dbData)
    obj = {"name": seriesName, "location": seriesPath,
           "image": image, "genre": genre}
    if image != "":
        seriesList.append(obj)
        print("Added "+seriesName)
    else:
        print("fail "+seriesName)


moviesDb.delete_many({})  # clear movie collection
moviesDb.insert_many(movieList)  # add to movie collection
seriesDb.delete_many({})  # clear series collection
seriesDb.insert_many(seriesList)  # add to series collection
