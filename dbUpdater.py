import pymongo
import os
from imdb import IMDb
from ImageDownloader import downloadFromGoogle
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
imdbDB = IMDb()
client = pymongo.MongoClient("localhost", 27017)  # mongo server address
db = client["nizriFlix"]  # db name
dbCol = db["Movies"]  # db collection
dirlocation = 'G:/Movies&Series/Movies/Genres'  # source
movieList = []

for dirpath, dirnames, filenames in os.walk(dirlocation):
    # print(filenames)
    names = filenames

    for name in names:
        image = "Empty_Img.png"
        dirpath = dirpath.replace("\\", "/")
        if '.mp4' in name:
            found = False
            newName = name.replace('.mp4', "")
            # check if img exist with the same name
            if(newName+".png" in names or newName+".jfif" in names or newName+".jpng" in names):
                for img in names:
                    fixImage = img.replace('_', " ")
                    # check some format in case of handwork downlaod
                    if ('.png' in img or '.jfif' in img or '.jpng' in img) and newName in fixImage:
                        image = img

            else:
                if(newName+".png" not in names and newName+".jfif" not in names and newName+".jpng" not in names):
                    found = downloadFromGoogle(newName, dirpath)
                    if found:
                        image = name+".png"
                    else:
                        print("fail " + newName)
                        img = "G:/Movies&Series/Movies/Empty_Img.png"

            # dirpathSplits = dirpath.split("/")
            # split the path between / and gets the genre name
            # genre = dirpathSplits[4]

            #!!:
            moviesData = imdbDB.search_movie(newName)

            if(moviesData):
                movieId = -1
                for movie in moviesData:

                    if movie.data['kind'] == 'movie' or movie.data['kind'] == 'video movie':
                        movieId = movie.movieID
                        break
                if movieId != -1:
                    movieData = imdbDB.get_movie(movieId)
                else:
                    print("can't find "+newName)
                if('genres' in movieData.data and movieId != -1):
                    obj = {"name": newName, "location": dirpath,
                           "image": image, "genre": movieData.data['genres']}
                    if image != "":
                        movieList.append(obj)
                        print("Added "+newName)
                    else:
                        print("fail "+newName)

 #!!:

            # print(movieData.data)
            # for genre in movieData.data['genres']:
            #     print(genre)


dbCol.delete_many({})  # clear collection
dbCol.insert_many(movieList)  # add to collection
