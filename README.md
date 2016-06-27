# A CRUD App using React and MongoDB

*MERN* Stack: Mongo, Express, React, Node.

## Usage

View this application in production at https://react-robots.herokuapp.com/.

## Contributing

### Prerequisites for Development

Install Node.

### Prerequisites for Testing

Install Java.

Download selenium standalone server:

```` sh
curl -O http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.0.jar
````

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
npm run db-seed
````

Start the web server.

```` sh
npm start
````

### Testing

Run all tests.

```` sh
npm run test --silent

````

#### API Tests

Run API tests only.

```` sh
npm run test-api --silent
````

#### Component Tests

Run all component tests.

```` sh
npm run test-components --silent
````

> NOTE: Component tests require a test web server to be running on localhost:3000. Use `npm run start-test`.

> NOTE: Component tests require a webdriver server to be running on http://127.0.0.1:4444/wd/hub. Use `npm run wdio-start`.

Run a single component test.

```` sh
npm run test-table --silent
npm run test-form --silent
npm run test-form-submit-new --silent
npm run test-form-submit-edit --silent
````

### Deploying

Deploy master branch to production.

```` sh
git push heroku master
````

<hr />




Commands used to make this repo:

```` sh
express react-robots --ejs
cd react-robots/
npm install --save webpack
npm install --save-dev webpack-dev-middleware webpack-hot-middleware
npm install --save babel-core babel-loader babel-preset-react babel-preset-es2015 style-loader css-loader
npm install --save react react-dom react-router
npm install --save jquery bootstrap file-loader url-loader
npm install --save moment-timezone json-loader
npm install --save mongoose
npm install --save-dev mocha expect supertest webdriverio babel-register babel-preset-es2017
````

Commands used to administer and deploy to production the first time:

```` sh
heroku create react-robots
heroku addons:create mongolab:sandbox
heroku addons:create scheduler
heroku addons:open scheduler # then add a new job for `npm run db-seed-production` to run hourly
````
