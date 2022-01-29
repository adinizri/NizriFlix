from email.mime import image
from itertools import count
from os import name
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

# Creating a webdriver instance
# driver = webdriver.Chrome('G:/chromedriver.exe')


def downloadFromGoogle(name, location):
    driver = webdriver.Chrome('G:/chromedriver.exe')
    # What you enter here will be searched for in
    # Google Images
    query = name + " movie poster"

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
    # scroll_to_bottom()
    # scroll_to_bottom(driver)
    # Loop to capture and save each image
    count = 0
    found = False
    while(found == False):

        # range(1, 50) will capture images 1 to 49 of the search results
        # You can change the range as per your need.
        try:

            # XPath of each image
            count += 1
            img = driver.find_element_by_xpath(
                '//*[@id="islrg"]/div[1]/div[' +
                str(count) + ']/a[1]/div[1]/img')

            # Enter the location of folder in which
            # the images will be saved

            if (img.size).get('width')/(img.size).get('height') > 1.6 and (img.size).get('width')/(img.size).get('height') < 2:

                img.screenshot(location + "/" + name + '.png')
                found = True

            # Each new screenshot will automatically
            # have its name updated

            # Just to avoid unwanted errors
                time.sleep(0.2)

        except:
            if(count > 100):
                break

            # if we can't find the XPath of an image,
            # we skip to the next image
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
