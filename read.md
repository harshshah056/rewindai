database

image    ----    
application name
url
text
note
time
date
imp or not 



detect active window
take screen shot 
ocr
reduce qulity of image
idle time detection



store in database
get active windows icon

read and show data on ui





active window info
    if browser
        getdata form pouchdb ---> like active tab, url of the tab, ..., url icon
        check with active window
            takescreenshot
            ocr
            compress
            image store
            check data of icon
                if present in database then simple incress the used image number
                if not present then fetch icon then store in the database
            data store in pouchdb


    not browser
        takescreenshot
        ocr
        compress
        image store
        check data of icon
            if present in database then simple incress the used image number
            if not present then fetch icon then store in the database
        data store in pouchdb


takescreenshot



50 ->>> 110 ---> 146 ---> 33.58

60 ->>> 123 --> 164  ->>> 37.72