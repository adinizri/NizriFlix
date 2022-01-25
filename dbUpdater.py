import pymongo
import os
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
        if 'mp4' in name:
            newName = name.replace('.mp4', "")
            for img in names:

                fixImage = img.replace('_', " ")

                if ('.png' in img or '.jfif' in img) and newName in fixImage:
                    image = img

            dirpath = dirpath.replace("\\", "/")
            img = "G:/Movies&Series/Movies/Empty_Img.png"
            dirpathSplits = dirpath.split("/")
            # split the path between / and gets the genre name
            genre = dirpathSplits[4]
            obj = {"name": newName, "location": dirpath,
                   "image": image, "genre": genre}
            if image != "":
                movieList.append(obj)

dbCol.delete_many({})  # clear collection
dbCol.insert_many(movieList)  # add to collection
