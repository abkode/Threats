Threat App

This program reads “threat” meta files (.json files) from (**/threats/files**) directory and renders them in a table using Ajax. Each record in the table displays all fields of the meta file. Each row is color-coded based on the record's threat level (rating). The table provide you sorting functionality of all fields and time-period dropdown (24-hours/7 days/4 weeks) for viewing records based on a given time-period. 

Based on time-period, every 30 seconds an alert displays to the user informing them to reload the table, also every 1.5 minutes the content of table updates automatically. Program reads the (**/threats/files**) directory every 1.5 minutes to detect any new record or changes and load them in the front-end.

You can simply drop any meta-files (.json file) into a directory (**/threats/files**) then the records will automatically render into a table in the front-end.

This program developed in **Python 2.7.10** and **Django 1.10.1**

Clone or download the program from GitHub and run the following command:

    `python manage.py runserver`

Now that the server’s running, visit **http://127.0.0.1:8000/threats/** with your Web browser.
