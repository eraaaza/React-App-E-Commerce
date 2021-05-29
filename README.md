# React-App-E-Commerce
* docker swarm app
* 
# How to run
* 1. Make sure to clone repo to your computer.
* 2. Open 3 terminal, with one terminal on .../React-App-E-Commerce and the other two on .../React-App-E-Commerce/server.
* 3. In each terminal run `npm i` to install all the necessary npm packages to run the project correctly.
* 4. In the terminal that is on .../React-App-E-Commerce run `npm start`. This will start up the front-end on your localhost.
* 5. Then in one of the terminals on .../React-App-E-Commerce/server run `npm run seed`. This will generated 100 dummy listings used to testing and demoing. They are generated using Faker.js.
* 6. Now in the other terminal on .../React-App-E-Commerce/server run `npm start`. This will start the back-end.
* 7. At this point, hit refresh on your browser to see the new listings created by our seed file. You able to inquire or buy these listings, as well as create your own.
* NOTE: Buying does not accept real money at the moment, maybe a paypal api would work nicely here
* NOTE: Site is AWS ready, but I am too broke to have it running on AWS at the moment. :/
