from email.mime import image
from itertools import count
from os import name
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import urllib
import time
import urllib3
import requests
import shutil
# Creating a webdriver instance
# driver = webdriver.Chrome('G:/chromedriver.exe')


def downloadFromGoogle(name, location):
    driver = webdriver.Chrome('G:/chromedriver.exe')
    # What you enter here will be searched for in
    # Google Images
    query = name + " wide movie poster wallpaper 1920X1080"

    # Maximize the screen
    # driver.maximize_window()

    # Open Google Images in the browser
    driver.get('https://images.google.com/')

    # Finding the search box
    box = driver.find_element_by_xpath('//*[@id="sbtc"]/div/div[2]/input')

    # Type the search query in the search box
    box.send_keys(query)

    # Pressing enter
    box.send_keys(Keys.ENTER)

    # NOTE: If you only want to capture a few images,
    # there is no need to use the scroll_to_bottom() function.

    # scroll_to_bottom(driver)
    # Loop to capture and save each image
    count = 0
    found = False
    limit = 200
    http = urllib3.PoolManager()
    minR = 1.7
    maxR = 1.8
    while(found == False):

        try:

            # XPath of each image
            count += 1
            img = driver.find_element_by_xpath(
                '//*[@id="islrg"]/div[1]/div[' +
                str(count) + ']/a[1]/div[1]/img')

            if (img.size).get('width')/(img.size).get('height') > minR and (img.size).get('width')/(img.size).get('height') < maxR:
                src = img.get_attribute('src')
                r = http.request('GET', src, preload_content=False)
                r.release_conn()
                with open(location + "/" + name + '.png', 'wb') as out:
                    shutil.copyfileobj(r, out)
                found = True

                # time.sleep(0.4)

        except:
            if(count > limit):
                if(maxR == 2):
                    break
                count = 0
                minR -= 0.1
                maxR += 0.1

            # if we can't find the XPath of an image,
            # we skip to the next image
            else:
                continue

    # Finally, we close the driver

    driver.close()
    return found
    # Function for scrolling to the bottom of Google
    # Images results


def scroll_to_bottom(driver):

    last_height = driver.execute_script('\
    return document.body.scrollHeight')

    while True:
        driver.execute_script('\
        window.scrollTo(0,document.body.scrollHeight)')

        # waiting for the results to load
        # Increase the sleep time if your internet is slow
        time.sleep(3)

        new_height = driver.execute_script('\
        return document.body.scrollHeight')

        # click on "Show more results" (if exists)
        try:
            driver.find_element_by_css_selector(".YstHxe input").click()

            # waiting for the results to load
            # Increase the sleep time if your internet is slow
            time.sleep(3)

        except:
            pass

        # checking if we have reached the bottom of the page
        if new_height == last_height:
            break

        last_height = new_height


# Calling the function
