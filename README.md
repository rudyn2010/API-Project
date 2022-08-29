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
npx dotenv sequelzie db:seed:all
```
5. Run npm start in the backend folder 
6. Run npm start in the frontend folder

Now you should be able to see the web application in your browser!


## Features Direction:

### Home Page Demo User
You should be able to test the features of the application without signing up by clicking in the "Demo User" button.
On this page a user can view spots

<img width="1786" alt="Screen Shot 2022-08-28 at 6 23 56 PM" src="https://user-images.githubusercontent.com/14317966/187105121-c4e4407f-b644-48a0-b092-e9d679b034f6.png">

### Spots Page by ID
User should be able to see a spots detail page by clicking on a spot or navigating to a valid spotId url.

<img width="1781" alt="Screen Shot 2022-08-28 at 6 29 20 PM" src="https://user-images.githubusercontent.com/14317966/187105423-2ad26e6c-dcc8-4ee5-a1d5-aff4d9e6e89f.png">

![Screen Shot 2022-08-28 at 8 38 31 PM](https://user-images.githubusercontent.com/14317966/187118411-201b0890-e8c8-4b3d-a723-caec0eec9e7f.png)

### Current User's Spots
User can view the spots that they have created.

<img width="1788" alt="Screen Shot 2022-08-28 at 6 33 45 PM" src="https://user-images.githubusercontent.com/14317966/187105887-ed62c421-407b-4c48-8b25-21b9323ae4b7.png">

### Current User's Reviews
User can view the reviews that they have created.

![Screen Shot 2022-08-28 at 9 02 58 PM](https://user-images.githubusercontent.com/14317966/187121018-ae54b124-4259-404a-b64d-ec31d77dd87e.png)
