# React-Robots

A CRUD Node.js web application built with Express, React, and MongoDB.

## Usage

View in production at: https://react-robots.herokuapp.com/.

## Contributing

### Prerequisites

Install node.js and mongodb.

### Installation

Get source code.

```` sh
git clone git@github.com:s2t2/react-robots.git
cd react-robots/
npm install
````

### Development

Seed a mongo database.

```` sh
npm run db-seed-dev
````

Start the web server.

```` sh
npm run webserver-dev
````

### Testing

#### API Tests

Run API tests.

```` sh
npm run test-api --silent
````

#### Component Tests

Component tests require a test-environment web server to be running on localhost:3000.

```` sh
npm run webserver-test
````

Test layout components:

```` sh
npm run test-layout-components --silent
````

Test robot components:

```` sh
npm run test-robot-components --silent
````

### Deploying

#### Initial Deploy

Commands for initial production deploy:

```` sh
heroku create react-robots
heroku addons:create mongolab:sandbox
heroku addons:create scheduler

````

Finally, open scheduler (`heroku addons:open scheduler`) and add a new hourly job:

```` sh
npm run db-seed-prod
````

#### Subsequent Deploys

Deploy master branch to production.

```` sh
git push heroku master
````
