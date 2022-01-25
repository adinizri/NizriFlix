import os

dirlocation = 'G:/Movies&Series/Movies/all'
for dirpath, dirnames, filenames in os.walk('G:/Movies&Series/Movies/Genres'):
    print(filenames)
    names = filenames

    for name in names:
        newName = name
        if 'TorrentPart' in newName:
            os.remove(dirpath+os.sep+name)
        else:
            newName = newName.replace(".", " ")

            if 'mp4' in newName:
                newName = newName.replace("mp4", "mp")
                newName = newName.replace("mp", "")
                if '1080p' in newName:
                    newName = newName.replace(
                        (newName[newName.index('1080p'):len(newName)-1]), "")
                if '720p' in newName:
                    newName = newName.replace(
                        (newName[newName.index('720p'):len(newName)-1]), "")
                if(' 4 ' in newName):
                    newName = newName.replace(" 4 ", "")
                newName += ".mp4"

            elif '4' == newName[-1] and not 'str' in newName:
                newName = newName.replace("4", ".mp4")

            if 'Sub' in dirpath:

                if '1080p' in newName:
                    newName = newName.replace(
                        (newName[newName.index('1080p'):len(newName)-1]), "")
                    newName += '-heb.srt'
                elif '720p' in newName:
                    newName = newName.replace(
                        (newName[newName.index('720p'):len(newName)-1]), "")
                    newName += '-heb.srt'
                else:
                    newName = newName.replace('-heb srt', "")
                    if not('-heb.srt' in newName):
                        newName += '-heb.srt'
            newName = newName.replace("  ", "")
            os.rename(dirpath+os.sep+name, dirpath+os.sep + newName)
