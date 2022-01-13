# foodsAPI-Testing
API Testing with Cypress

Requirement to run the application: MySQL, Node and Cypress

Steps to follow to run the application

1.- You need to go to the application https://github.com/alvarop281/foodsAPI and follow the instructions in the README.md file of that repository.

2.- Clone this repository.

3.- npm install

4.- npm test

5.- create the cypress.env.json file, where the following data will be added:

    {
        "env": {
            "testUser": {
                "id": 5,
                "full_name": "Pierre Swaniawski",
                "password": "FKj0GptpkNa5P2H",
                "dni": "1986136341",
                "phone_number": "1-884-962-2557 x3624",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJmdWxsX25hbWUiOiJQaWVycmUgU3dhbmlhd3NraSIsImRuaSI6IjE5ODYxMzYzNDEiLCJwaG9uZV9udW1iZXIiOiIxLTg4NC05NjItMjU1NyB4MzYyNCJ9LCJpYXQiOjE2NDA5NzczNzgsImV4cCI6MTY0MzY1NTc3OH0.FgbDnkgdOqVlX6T8Dz6gUc0uNm6XIyel8ZXlDI7xSnM"
            },
            "testNonAdminUser": {
                "id": 96,
                "full_name": "Brett Bergstrom",
                "password": "GbaMU_zSjwFZkTu",
                "dni": "1976067989",
                "phone_number": "713-690-4657 x0381",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5NiwiZnVsbF9uYW1lIjoiQnJldHQgQmVyZ3N0cm9tIiwiZG5pIjoiMTk3NjA2Nzk4OSIsInBob25lX251bWJlciI6IjcxMy02OTAtNDY1NyB4MDM4MSJ9LCJpYXQiOjE2NDExNTYwMTEsImV4cCI6MTY0MzgzNDQxMX0.JN9hqqAjkjMDDVu_Dwb5Eah814xGRBZZmNZmtpvG9gw"
            }
        }
    }

5.1.- For this, you must run the integration test, API rest / auth / POST_signin.spect.ts and open the console to take the data of the created user. Repeat this step 2 times, then it is necessary to update in MySQL in the foods database, user table, the type_of_user property and assign the value "admin" for one of the 2 users created. the administrator user is the testUser user and the non-administrator user will be the testNonAdminUser

6.- the following data must be configured in the cypress.json file:

    {
        "baseUrl": "http://localhost:3000/foods/api/v1/",
        "env": {
            "db": {
                "host": "",
                "user": "",
                "password": "
                "database": "foods"
            }
        }
    }
