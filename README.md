## MERN Stack Assignment

## Description

`- This React application is built using [vite](https://vitejs.dev).`

`- It Uses [Tailwind CSS](https://tailwindcss.com/).`

`- The application uses node.js as backend.`

`- Database it uses MongoDB.`

## Pre-requisites

`- [git](https://git-scm.com/) - v2.13 or greater`

`- [NodeJs](https://nodejs.org/en/) -v16 or greater`

`- [npm](https://www.npmjs.com/) -v6 or greater`

## Running in dev environment

0. `git clone https://github.com/Sahil-Sayyad/Assignment_.git`
1. `cd your_application`
2. `npm install`
3. `npm start -- this for backend server `
4. `cd frontend` 
5. `npm install`
6. `npm run dev -- this for frontend react server`

## .env file

`this file contains mongodb environment variable that you can configure.`

## API Endpoints

```  
    - GET /api/fetch : Create new transactions.
    - GET /api/transactions : Get a list of transactions.
    - GET /api/statistics : Get summary statistics about transactions.
    - GET /api/bar-chart : Get data to make a bar chart of transactions.

    Note: 
    - Here you don't need request all api's these api's managed by frontend with react,
      Just here you need to hit the "backend-server/api/fetch" for e.g(http://localhost:8000/api/fetch ) for the fetching data and storing in db.
```
