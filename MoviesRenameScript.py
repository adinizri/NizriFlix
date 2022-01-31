import os

dirlocation = 'G:/Movies&Series/Movies'
for dirpath, dirnames, filenames in os.walk('G:/Movies&Series/Movies'):
    names = filenames
    for name in names:
        newName = name
        if 'TorrentPart' in newName:
            os.remove(dirpath+os.sep+name)
        else:
            if ".jfif" not in newName and ".png" not in newName:
                newName = newName.replace(".", " ")  # replace dot in space
                newName = newName.replace("[", "")
                newName = newName.replace("]", "")
                if 'mp4' in newName:  # fixing initial problems
                    newName = newName.replace("mp4", "")

                    if '1080p' in newName:
                        newName = newName.replace(
                            (newName[newName.index('1080p'):len(newName)-1]), "")
                    if '720p' in newName:
                        newName = newName.replace(
                            (newName[newName.index('720p'):len(newName)-1]), "")

                    newName += ".mp4"

                elif '4' == newName[-1] and not 'str' in newName:
                    newName = newName.replace("4", ".mp4")

                if '.srt' in newName:
                    if 'mp4' in newName:  # fixing initial problems
                        newName = newName.replace(".mp4", "")
                    if '1080p' in newName:
                        newName = newName.replace(
                            (newName[newName.index('1080p'):len(newName)-1]), "")

                    elif '720p' in newName:
                        newName = newName.replace(
                            (newName[newName.index('720p'):len(newName)-1]), "")

                    else:
                        newName = newName.replace(' srt', "")
                        if not('.srt' in newName):
                            newName += '.srt'
                # if '-heb srt' in newName: #fixed one time bug
                #     newName = newName.replace("-heb srt", "-heb.srt")
                newName = newName.replace("  ", "")
                if ' .mp4' in newName:
                    newName = newName.replace(" .mp4", ".mp4")

                print(name + "=>" + newName)
                os.rename(dirpath+os.sep+name, dirpath+os.sep + newName)
