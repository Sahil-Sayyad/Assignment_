## MERN Stack Assignment

## Description

`- This React application is built using [vite](https://vitejs.dev).`

`- It Uses [Tailwind CSS](https://tailwindcss.com/).`

`- The application uses node.js as the backend.`

`- Database it uses MongoDB.`

## Pre-requisites

`- [git](https://git-scm.com/) - v2.13 or greater`

`- [NodeJs](https://nodejs.org/en/) -v16 or greater`

`- [npm](https://www.npmjs.com/) -v6 or greater`

## Running in dev environment

0. `git clone https://github.com/Sahil-Sayyad/Assignment_.git`
1. `cd Assignment_`
2. `npm install`
3. `set .env file MongoDB URL`
4. `npm start -- this for backend server `
5. `cd frontend` 
6. `npm install`
7. `npm run dev -- this for frontend react server`

## .env file

`This file contains mongodb environment variable that you can configure.`

## API Endpoints

```  
    - GET /api/fetch : fetch and store transactions.
    - GET /api/transactions?selectedMonth=March&searchQuery=&currentPage=1&perPage=10 : Get a list of transactions with filter and sorting.
    - GET /api/statistics?month=March : Get summary statistics about transactions with filter and sorting.
    - GET /api/bar-chart?month=March : Get data for bar chart transactions with filter and sorting.
    - GET /api/pie-chart?month=March : Get data for Pie chart transactions with filter and sorting.
    - GET /api/combine-data : fetches the data from all the 4 APIs mentioned above, combines the response and sends a final response of the combined JSON.

    Note: 
    - Here you don't need to request all API's these API's managed by frontend with react,
    - Just here you need to hit the "backend-server/api/fetch" for the first time e.g. (http://localhost:8000/api/fetch ) for fetching data and storing it in db.
    - You can also test all the mentioned API endpoints with Postman or other tools.
    - last API endpoint "api/combine-data" you need to test with the Postman or with other tools.  
```
## Demo Video

```
   - To see the frontend part you need to 'cd frontend' and then start 'npm run dev' to get the URL e.g. (http://localhost:5173/).
```
[Demo Video](https://github.com/Sahil-Sayyad/Assignment_/assets/96423459/6f1aa748-f4a0-43a7-80ae-56c1d68457fd)

