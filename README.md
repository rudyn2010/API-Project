#OxygenBnB
## Welcome to OxygenBnB, a project clone I made of AirBnB!
## About OxygenBnB
OxygenBnB is a web application inspired by AirBnB. This project mimics the ability to create an online market place for hosting various spaces.

[Click Here to interact with OxygenBnB](https://oxygenbnb.herokuapp.com/)

## Below are links to Project Wiki:</h2>

[API Routes](https://github.com/rudyn2010/API-Project/wiki/API-ROUTES)

[DB Schema](https://github.com/rudyn2010/API-Project/wiki/DB-SCHEMA)

[Features List](https://github.com/rudyn2010/API-Project/wiki/FEATURES)

[Redux State Shape](https://github.com/rudyn2010/API-Project/wiki/REDUX-STATE-SHAPE)


## Tech Stack:

### Frameworks, Platforms, and Libraries:
Frontend: JavaScript, React, Redux, CSS, HTML:

Backend: Express, Node.Js

Database: Postgres

Hosted On: Heroku

## How to Run Locally:
1. Clone the github repository in your terminal to a file location of your choice
2. Run npm i && npm i -D in both the Backend and Frontend folders
3. Create a .env file in the Backend folder and copy the contents below. Replace your secret key with your own!
```
PORT=8000
DB_FILE=db/dev.db
JWT_SECRET= <<Your Secret Key>>
JWT_EXPIRES_IN=604800

```
4. In the backend folder initialize the database and run the seeder files with the following commmands:
```
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
5. Run npm start in the backend folder
6. Run npm start in the frontend folder

Now you should be able to see the web application in your browser!


## Features Direction:

### Home Page Demo User
On this page a user can view spots.
You should be able to test the features of the application without having to sign up by clicking on the Demo User option in login prompt.

<img width="897" alt="Screen Shot 2022-08-29 at 2 15 55 AM" src="https://user-images.githubusercontent.com/14317966/187170789-86398d43-fefc-4dfa-a1ff-4ab68ee92341.png">

### Spots Page by ID
User should be able to see a spots detail page by clicking on a spot or navigating to a valid spotId url.

<img width="1791" alt="Screen Shot 2022-08-29 at 2 23 44 AM" src="https://user-images.githubusercontent.com/14317966/187171087-e561ecfd-00e6-451c-874a-2af698cbea51.png">

<img width="1789" alt="Screen Shot 2022-08-29 at 2 24 05 AM" src="https://user-images.githubusercontent.com/14317966/187171569-d915acaa-6150-4f0e-9fc8-6b6b90eb1992.png">

### Current User's Spots
User can view the spots that they have created.

<img width="1792" alt="Screen Shot 2022-08-29 at 2 42 13 AM" src="https://user-images.githubusercontent.com/14317966/187173084-9d9c6e37-ea44-4074-82f2-1e5a23c3d95a.png">

### Current User's Reviews
User can view the reviews that they have created.

<img width="1792" alt="Screen Shot 2022-08-29 at 2 40 48 AM" src="https://user-images.githubusercontent.com/14317966/187172796-0396708a-2ac1-43ce-8e60-5c9008f1f800.png">
