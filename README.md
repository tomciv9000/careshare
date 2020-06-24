# CareShare

CareShare allows a user to track the important caregiving events and routines for a baby or toddler. The daily diapers, naps, meals, bedtimes, and more are easily updated and monitored for every caregiving shift.  Instead of relying on memory or hastily written notes, CareShare makes it easy to know "Who Did What When?"

This Single-Page Application uses a Rails API back-end and PostgreSQL database with a Javascript front-end.


### Getting Started

To get started using this app do the following:

- Clone the repository
  - ```git clone https://github.com/tomciv9000/careshare```

- Navigate to the top of the 'careshare-backend' directory
  - ```cd careshare-backend```
- Install required gem dependencies
  - ```bundle install```
- Start a PostgreSQL server in the PostgreSQL app
  - Download the app at 'https://www.postgresql.org/download/' if you don't have it
- Create the database
  - ```rails db:create```
- Migrate the tables
  - ```rails db:migrate```
- Seed the database with a few sample caregiving shifts
  - ```rails db:seed```
- Start your rails server
  - ```rails s```
- Open index.html in browser

- Take care of those kids!

[Video Demo](https://www.dropbox.com/s/gkcgxvq8kitlgt5/CARESHARE_Thomas_White.mp4?dl=0)

[Blog Post](https://tomciv9000.github.io/taking_care)

##### If you have any feedback for my application, please let me know. Thank you for taking a look.