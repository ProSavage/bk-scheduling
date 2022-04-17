# bk-scheduling
A scheduling application targetted towards use by Auburn University student worker services. The goal is to be able to create schedules for workers, have the workers sign up, and then have the ability to manage said schedule and workers.

## Architecture
This is a fullstack web application, built entirely using [TypeScript](https://www.typescriptlang.org/). <br/>
The application has three parts. There is a web client, a web server, and a [MongoDB](https://mongodb.com/) database. 

The project uses [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) to allow us to create modules to seperate our code. 
We also have a shared common module where we have code that can be shared betweent the client and the server. 

### Web Client
The web client runs completely on the user's browser, it has no access to the database, and uses HTTP requests to communicate with the web server. 
It uses [ReactJS](https://reactjs.org/) for rendering the user interface. We also utilized [ChakraUI](https://chakra-ui.com/) so that we had prebuilt components to give our application a more polished look.

### Web Server
The web server listens for HTTP requests from any clients to perform any application logic. 
The server uses [ExressJS](https://expressjs.com/) to listen for HTTP requests. Requests are validated using [Express-Validator](https://express-validator.github.io/docs/), this library basically allows the application to make sure all input is valid and also sanitized before running any application logic.

### MongoDB Database
The web server uses the database for persistent data storage, the web server uses the library [Mongoose](https://mongoosejs.com/) to communicate and manage the actual database.
We prefer using this library because it leads to more elegant code compared to using raw queries. 

## Development Workflow
You will need to install [NodeJS V16](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x64.msi) to be able to execute JavaScript outside of the browser.
Once you have installed NodeJS, you will need to install the [Yarn](https://yarnpkg.com/) package manager because the project utilizes Yarn Workspaces.
#### How to install Yarn
1. Open the terminal.
2. Run the command `npm install -g yarn`
3. If you are on windows, you may need to follow some specific prompts from the previous step to allow yarn proper access.

How to install the database:
https://www.mongodb.com/docs/manual/administration/install-community/

### How to view project locally.
> These steps should only be run, if you have already set up a database.
1. Clone the project from this repository.
2. In the root of the project, open a terminal and run the command `yarn install`.
3. Next we need to build the common module, in the root of the project, run `yarn build-base`
> You need to run the backend and frontend in two seperate terminals.
4. Now we can start the backend server: run `yarn dev:backend`
5. For the web client, run: `yarn dev:frontend`

