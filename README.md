# WashTastic
## Introduction


Laundry can be a hassle for every household. Whether you are sharing the laundry duty with your family or your roommates, it is hard to keep track of everything sometimes. We have all forgotten to take the clothes out of the washing machine before. It is also annoying to figure out what clothes are lying in the laundry basket.

Our application helps the users in a group manage the shared laundries and tasks. Any user can create a group and invite their roommates or family members. The user can add the clothes into the application and keep track of their cleaning status. The basket feature helps the group organize dirty laundry, keep track of the clothes and the current tasks. A basket may contain the dirty laundry of a single user or multiple members of the same group. The user can also monitor the washing and drying status, and get notified when a timed job is done.

#### Course:

`CS-554 Fall 2021`

#### Instructor

Patrick Hill
#### Group Members


- [Smit Gor](https://github.com/Smit36)
- [Vivian Dbritto](https://github.com/dbrittovivian)
- [Dhruveel Doshi](https://github.com/dhruveeldoshi)
- [Ming-Wei Hu](https://github.com/davidhu34)

### Features

#### User and Groups

- Google sign-in with Firebase Authentication
- Create/Join/Leave group(s)

#### Manage Clothes

- Manage clothes with different types and weight
- Put clothes into available baskets

#### Manage Baskets

- Manage baskets clothes and the weight capacity
- Monitor laundry items and status
- Timer for washing and drying tasks
- Live status updates with Firebase Cloud Messaging
- Background notifications with Firebase Cloud Messaging

#### Tasks Overview

- Moniter and operate baskets from recent activities

## Running the Application


#### [IMPORTANT] Enable Notification for web browsers (Recommended: Chrome/Firefox/Edge)
### `Heroku` Demo

A demo version is deployed and available on Heroku
[https://washtastic.herokuapp.com](https://washtastic.herokuapp.com)

For `Heroku` deployment setup, please refer to:
[https://github.com/Smit36/cs-554/tree/deploy](https://github.com/Smit36/cs-554/tree/deploy)

### Running a Local Build

### `Redis`


- Redis connection has to be available for `localhost:6379` 
- Recommended version for demo: Redis v6.2
- Used key for HSET: `clothes_basket_location`

### `MongoDB`

- Database connection has to be available for `localhost:27017` or `mongodb+srv://demo1:<password>@cluster0.2nmo4.mongodb.net/myFirstDatabase`
- Recommended edition for demo: MongoDB 4.4.3 Community

A set of demo data available.
#### Seed data

A seeding task for `MongoDB` is available.
Run the seeding script to clean up and seed the database.

from project root:
```
$ cd server
$ npm install
$ npm run seed
```

### Start the Application Server

- Add provided private key settings file for Firebase Cloud Messaging: `server/config/serviceAccountKey.json` (not included in this repo)
- Run this `NodeJS` application locally on port `3001` via `npm`

from project root:
```
$ cd server
$ npm install
$ npm start
```

### `React`


- Add the provided enviroment variable file: `client/.env` (not included in this repo)
- Start `create-react-app` application on port `3000` via `yarn`

from project root:
```
$ cd client
$ yarn
$ yarn start
```
