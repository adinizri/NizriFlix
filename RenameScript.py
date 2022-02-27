import os
import re
dirlocation = 'G:/Movies&Series'
for dirpath, dirnames, filenames in os.walk(dirlocation):
    names = filenames
    for name in names:
        newName = name
        if 'TorrentPart' in newName:
            os.remove(dirpath+os.sep+name)
        else:
            dirpath = dirpath.replace("\\", "/")
            if ".jfif" not in newName and ".png" not in newName and ".srt" not in newName and ".jpg" not in newName:
                newName = newName.replace("[", "")
                newName = newName.replace("]", "")

                if '.mp4' in newName or '.mkv' in newName:  # fixing initial problems

                    newName = newName.replace(".mp4", "")
                    newName = newName.replace(".mkv", "")  # handle videos
                    newName = newName.replace(".", " ")  # replace dot in space
                    newName = newName.replace("_", " ")  # replace dot in space
                    if('/Series/' in dirpath):
                        newName = re.sub("[\(\[].*?[\)\]]", " ", newName)

                    if '1080p' in newName:
                        newName = newName.replace(
                            (newName[newName.index('1080p'):len(newName)-1]), "")
                    if '720p' in newName:
                        newName = newName.replace(
                            (newName[newName.index('720p'):len(newName)-1]), "")
                    if '2160p' in newName:
                        newName = newName.replace(
                            (newName[newName.index('2160p'):len(newName)-1]), "")
                    newName += ".mp4"
                    newName = newName.replace(" .mp4", ".mp4")

                elif '.srt' in newName:  # handle subs
                    newName = newName.replace(".srt", "")
                    if 'mp4' in newName:  # fixing initial problems
                        newName = newName.replace(".mp4", "")
                    if 'mkv' in newName:  # fixing initial problems
                        newName = newName.replace(".mkv", "")
                    if '1080p' in newName:
                        newName = newName.replace(
                            (newName[newName.index('1080p'):len(newName)-1]), "")
                    if '2160p' in newName:
                        newName = newName.replace(
                            (newName[newName.index('2160p'):len(newName)-1]), "")

                    elif '720p' in newName:
                        newName = newName.replace(
                            (newName[newName.index('720p'):len(newName)-1]), "")

                    if not('.srt' in newName):
                        newName += '.srt'
                else:  # handle the rest
                    if ".jfif" not in newName and ".png" not in newName and ".srt" not in newName:
                        newName = newName.replace(
                            ".", " ")  # replace dot in space

                # if '-heb srt' in newName: #fixed one time bug
                #     newName = newName.replace("-heb srt", "-heb.srt")
                newName = newName.replace("  ", "")
                print(name + "=>" + newName)

                os.rename(dirpath+"/"+name, dirpath+"/" + newName)
